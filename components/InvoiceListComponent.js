/**
 * 
 * @param {*} fetchType - swr|other
 * @param {*} invoiceData - list of Invoice{}
 */
 const InvoiceListComponent = function (fetchType, invoiceData) {
    return (
        <>
            <div>Data from {fetchType}</div>
            <ul>
                {invoiceData && invoiceData.map(({title, author})=>(
                    <li key={title}><span>{title}</span>, <span>{author}</span></li>
                ))}
            </ul>
        </>)
}

export default InvoiceListComponent;
