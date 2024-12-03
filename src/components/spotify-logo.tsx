import { useStore } from '@nanostores/preact'
import { isHidden } from '@pgl/store'

const SpotifyLogo = () => {
  const $isHidden = useStore(isHidden)

  return $isHidden ? null : (
    <a
      href="https://open.spotify.com/artist/448XePsDHCCARSgf0XhtUQ"
      className="mr-4 duration-200 md:hover:scale-125 lg:mr-8">
      <img
        src="/spotify-logo.png"
        alt="spotify"
        className="h-5 w-5 object-cover md:h-6 md:w-6"
      />
    </a>
  )
}

export default SpotifyLogo
