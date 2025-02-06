
import "../styles/table.css"


//Give the function a dict and it gives you a table
export const DynamicTable = ({ data }) => {
    return (
        <table className="table" border="0">
            <tbody>
                {data.map((item, index) => (
                    <tr className="table-row" key={index}>
                        <td>{item.label}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
