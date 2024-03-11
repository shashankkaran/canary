import styles from './SelectCategory.module.css'

const SelectCategory = (props) => {
    return(
        <article className={styles.select}>
                <select name={props.name} onChange={props.onChange} value={props.value}>
                    <option value="" selected disabled>
                        Categories
                    </option>
                    <option value=" A (Address) Record"> A (Address) Record</option>
                    <option value="AAAA (IPv6 Address) Record">AAAA (IPv6 Address) Record</option>
                    <option value="CNAME (Canonical Name) Record">CNAME (Canonical Name) Record</option>
                    <option value="MX (Mail Exchange) Record">MX (Mail Exchange) Record</option>
                    <option value="NS (Name Server) Record">NS (Name Server) Record</option>
                    <option value="PTR (Pointer) Record">PTR (Pointer) Record</option>
                    <option value="SOA (Start of Authority) Record">SOA (Start of Authority) Record</option>
                    <option value=" SRV (Service) Record"> SRV (Service) Record</option>
                    <option value="TXT (Text) Record">TXT (Text) Record</option>
                    <option value="DNSSEC">DNSSEC</option>
                </select>
            </article>
    )
}

export default SelectCategory;