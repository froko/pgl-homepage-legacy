require('dotenv').config()

const { FTP_HOST, FTP_USER, FTP_PASSWORD } = process.env

const ftp = require('basic-ftp')
const FtpDeploy = require('ftp-deploy')
const basicFtpClient = new ftp.Client()

const LOCAL_BUILD_DIRECTORY = 'dist'
const DEPLOY_DIRECTORY_NAME = 'deploy'
const BACKUP_DIRECTORY_NAME = 'backup'
const PRODUCTION_DIRECTORY_NAME = 'httpdocs'

function main() {
  return uploadBuildDirectory()
    .catch((error) => onError('Upload', error))
    .then(() => renameFtpDirectories())
    .catch((error) => onError('Rename', error))
    .then(() => {
      console.log('Deploy FINISHED')
      basicFtpClient.close()
      process.exit(0)
    })
}

function uploadBuildDirectory() {
  const config = {
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    port: 21,
    continueOnError: false,
    localRoot: `./${LOCAL_BUILD_DIRECTORY}`,
    remoteRoot: `./${DEPLOY_DIRECTORY_NAME}`,
    forcePasv: true,
    sftp: false,
    include: ['*', '.*', '**/*'],
  }

  const ftpDeploy = new FtpDeploy()

  ftpDeploy.on('uploading', (data) => {
    const { totalFilesCount, transferredFileCount, filename } = data
    console.log(`${transferredFileCount} out of ${totalFilesCount} ${filename}`)
  })

  ftpDeploy.on('upload-error', (data) => {
    console.log(data.err)
    throw new Error('Upload FAILED')
  })

  return ftpDeploy.deploy(config).then(() => console.log(`Upload COMPLETED`))
}

async function renameFtpDirectories() {
  await basicFtpClient.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: false,
  })

  const directories = await basicFtpClient.list('.')
  const backupDirectoryName = createBackupDirectoryName(directories)
  console.log(`Backup folder name: ${backupDirectoryName}`)

  await basicFtpClient.rename(PRODUCTION_DIRECTORY_NAME, backupDirectoryName)
  await basicFtpClient.rename(DEPLOY_DIRECTORY_NAME, PRODUCTION_DIRECTORY_NAME)
  console.log('Renaming COMPLETED')

  return backupDirectoryName
}

function createBackupDirectoryName(directories) {
  const formattedDate = formatDate(new Date())
  const numberOfDateOccurrences = directories.filter((fileInfo) =>
    fileInfo.name.includes(formattedDate),
  ).length

  if (numberOfDateOccurrences === 0) {
    return `${BACKUP_DIRECTORY_NAME}_${formattedDate}`
  } else {
    return `${BACKUP_DIRECTORY_NAME}_${formattedDate}_${numberOfDateOccurrences + 1}`
  }
}

function formatDate(date) {
  const month = date.getMonth() + 1
  const paddedMonth = month.toString().padStart(2, '0')
  const paddedDay = date.getDate().toString().padStart(2, '0')

  return `${date.getFullYear()}-${paddedMonth}-${paddedDay}`
}

function onError(name, error) {
  console.log(`${name} FAILED`)
  console.log(error)
  fail()
}

function fail() {
  basicFtpClient.close()
  process.exit(1)
}

main()
