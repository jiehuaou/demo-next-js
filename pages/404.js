
import { Card, Text, Row } from "@nextui-org/react"
import homeStyle from '../styles/Home.module.css'

/**
 * default 404 page
 */

export default function Default404() {

    return <div className={homeStyle.grid}>
        <Text h2>404, 本來無一物</Text>
    </div>
}