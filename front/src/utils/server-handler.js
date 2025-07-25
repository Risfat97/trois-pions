const sendLog = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/create-visitor.php`);
    if(response.status === 200) {
        const responseBody = await response.json();
        return responseBody;
    } else {
        throw new Error(response.statusText);
    }
}

const getLink = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/create-link.php`);
    if(response.status === 200) {
        const responseBody = await response.json();
        return window.location.href + '?game=' + responseBody.data.link;
    } else {
        throw new Error(response.statusText);
    }
}

const join = async (link) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/join-link.php?link=${link}`);
    if(response.status === 200) {
        const responseBody = await response.json();
        return responseBody;
    } else {
        throw new Error(response.statusText);
    }
};

export { sendLog, getLink, join };