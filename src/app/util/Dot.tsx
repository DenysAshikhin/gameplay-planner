const Dot = ({ size, radius }: { size?: string, radius?: string }) => {
    return <div className='elementToFadeInAndOut' style={{
        color: 'red', backgroundColor: 'red',
        width: size ? size : '12px', height: size ? size : '12px',
        borderRadius: radius ? radius : '6px'
    }}>

    </div>;
}

export default Dot;