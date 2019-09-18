//http://api.openweathermap.org/data/2.5/weather?q=valence&APPID=56b54737cee432fa16e84110b8e24e90&units=metric
const baseUrl = 'http://api.openweathermap.org/data/2.5/';
const apiKey = '56b54737cee432fa16e84110b8e24e90';
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export function requestGet(endPoint, query = '') {

    endPoint = `${endPoint}?${query}&APPID=${apiKey}&units=metric`;

    return fetch(baseUrl + endPoint, {
        method: 'GET',
        headers,
    }).then(response => {
        if (response.status === 200) {
            return response
                .json()
                .then(json => {
                    return json !== undefined ? json : {};
                })
                .catch(e=> ({}));
        }
        return response.status;
    })
}
export function requestGetCircle(endPoint, query = '') {

    endPoint = `${endPoint}?${query}&APPID=${apiKey}&units=metric`;
    return fetch(baseUrl + endPoint, {
        method: 'GET',
        headers,
    }).then(response => {

        if (response.status === 200) {
            return response
                .json()
                .then(json => {
                    return json !== undefined ? json : {};
                })
                .catch(e=> ({}));
        }
        return response.status;
    })
}

