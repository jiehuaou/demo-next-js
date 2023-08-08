
import { Card, Grid, Text, Badge, Button, Loading,Table } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

/**
 * 
 * @param {*} param0 
 * @returns {import('react').ReactElement}
 */
 const UserListComponent = function ({ userData, isLoading }) {

    if(isLoading) {
        return <Loading type="points" size='sm' />
    }

    return (<Table compact
                shadow={false}
                selectionMode="multiple"
                aria-label="Example static collection table"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}>
                <Table.Header>
                    <Table.Column>ID</Table.Column>
                    <Table.Column>Email</Table.Column>
                    <Table.Column>Role</Table.Column>
                </Table.Header>
                <Table.Body>
                    {userData && userData?.map(({ id, email, role }) => (
                        <Table.Row key={id}>
                            <Table.Cell>{id}</Table.Cell>
                            <Table.Cell>{email}</Table.Cell>
                            <Table.Cell>{role}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>    
    )
}

export default UserListComponent;