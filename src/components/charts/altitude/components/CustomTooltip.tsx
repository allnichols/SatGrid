
function CustomTooltip(props: any) {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
                <p className="text-sm"> <span className="font-bold capitalize">{`${payload[0].name}:`}</span> {`${payload[0].value} km`}</p>
            </div>
        );
    }
    return null;
}

export default CustomTooltip;