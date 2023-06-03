import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';

export default function Loading(params) {
    return (<Image
        priority
        className={utilStyles.loadingImage}
        src="/images/discord-loading-dots-discord-loading.gif"
        height={14}
        width={40}
        alt=""
        title={`loading ...`}
      />)
    
}