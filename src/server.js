const serverStorageString = "indie.johnbrynte.harjagpollenallergi.server";
const SERVER_API = "https://www.johnbrynte.se/api/pollen/user/";

export const createServerData = async (data) => {
    const r = await fetch(SERVER_API, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: "create&data=" + encodeURIComponent(JSON.stringify(data))
    });

    if (r.status !== 200) {
        throw new Error("Something went wrong");
    }

    const responseData = await r.json();

    if (!responseData.success) {
        throw new Error(r.error);
    }

    setServerToken(responseData.data.token);

    return responseData.data.token;
}

export const saveServerData = async (token, data) => {
    if (!data) {
        return;
    }

    const r = await fetch(SERVER_API, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: "update=" + token + "&data=" + encodeURIComponent(JSON.stringify(data))
    });

    if (r.status !== 200) {
        throw new Error("Something went wrong");
    }

    const responseData = await r.json();

    if (!responseData.success) {
        throw new Error(r.error);
    }
}

export const deleteServerData = async (token) => {
    const r = await fetch(SERVER_API, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: "delete=" + token
    });

    if (r.status !== 200) {
        throw new Error("Something went wrong");
    }

    const responseData = await r.json();

    if (!responseData.success) {
        throw new Error(r.error);
    }

    setServerToken(null);
}

export const getServerData = async () => {
    const token = getServerToken();

    if (!token) {
        return null;
    }

    const r = await fetch(SERVER_API + "?token=" + token);

    if (r.status !== 200) {
        return null;
    }

    const responseData = await r.json();

    if (!responseData.success) {
        return null;
    }

    return responseData.data;
}

export const setServerToken = (token) => {
    if (token) {
        window.localStorage.setItem(serverStorageString, token);
    } else {
        window.localStorage.removeItem(serverStorageString);
    }
}

export const getServerToken = () => {
    return window.localStorage.getItem(serverStorageString) || null;
}