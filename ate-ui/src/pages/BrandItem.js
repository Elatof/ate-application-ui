function BrandItem(props) {
    const brandItem = props.item;

    return (
        <div>
            <tr key={brandItem.id}>
                <td>{brandItem.name}</td>
            </tr>
        </div>
    );
}

export default BrandItem;
