const sendLog = async () => {
    const response = await fetch('http://localhost:4500/public/create-visitor.php');
    if(response.status === 200) {
        const responseBody = await response.json();
        return responseBody;
    } else {
        throw new Error(response.statusText);
    }
}

const getLink = async () => {
    const response = await fetch('http://localhost:4500/public/create-link.php');
    if(response.status === 200) {
        const responseBody = await response.json();
        return window.location.href + '?game=' + responseBody.data.link;
    } else {
        throw new Error(response.statusText);
    }
}

const join = async (link) => {
    const response = await fetch('http://localhost:4500/public/join-link.php?link='+link);
    if(response.status === 200) {
        const responseBody = await response.json();
        return responseBody;
    } else {
        throw new Error(response.statusText);
    }
};

export { sendLog, getLink, join };