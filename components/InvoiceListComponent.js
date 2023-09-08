import utilStyles from '../styles/utils.module.css';
import { clsx } from 'clsx';
import { Loading, Text, Table, Spacer } from "@nextui-org/react";

const IconPic = function () {
    return (
        <img src='/images/fetch_logo.png' className={clsx(
            utilStyles.smallImage, utilStyles.loadingImage
        )} />
    )
}

/**
 * @param {object} args
 * @param {string} args.fetchType - swr|other
 * @param {{title:string, author:string}[]} args.invoiceData - list of Invoice{}
 * @param {boolean} args.isValidating - 
 */
const InvoiceListComponent = function ({ fetchType, invoiceData, isValidating }) {
    return (
        <>
            <div>Data from {fetchType} {isValidating ? <Loading type="points" size='sm' /> : ''}</div>
            <Table compact
                shadow={false}
                selectionMode="multiple"
                aria-label="Example static collection table"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}>
                <Table.Header>
                    <Table.Column>title</Table.Column>
                    <Table.Column>user</Table.Column>
                </Table.Header>
                <Table.Body>
                    {invoiceData && invoiceData?.map(({ title, author }) => (
                        <Table.Row key={title}>
                            <Table.Cell>{title}</Table.Cell>
                            <Table.Cell>{author}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>)
}

export default InvoiceListComponent;
