function LoadingImage() {
    return ( 
        <div style={{ height: "100%", width: "100%", backgroundColor: "black" }}>
            <img src="/Assets/loading.webp" alt="Loading" style={{ backgroundColor: "black", position: "absolute", top: 0, left: 0, height: "100%", width: "100%", objectFit: "contain" }} />
        </div>
     );
}

export default LoadingImage;