import utilStyles from '../styles/utils.module.css';
import { clsx } from 'clsx';

const IconPic = function () {
    return (
        <img src='/images/fetch_logo.png' className={clsx(
            utilStyles.smallImage, utilStyles.loadingImage
        )}/>
    )
}

/**
 * 
 * @param {*} fetchType - swr|other
 * @param {*} invoiceData - list of Invoice{}
 */
 const InvoiceListComponent = function ({fetchType, invoiceData, isValidating}) {
    return (
        <>
            <div>Data from {fetchType} {isValidating?<IconPic/>:''}</div>
            <ul>
                {invoiceData && invoiceData?.map(({title, author})=>(
                    <li key={title}><span>{title}</span>, <span>{author}</span></li>
                ))}
            </ul>
        </>)
}

export default InvoiceListComponent;
