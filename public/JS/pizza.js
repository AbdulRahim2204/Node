// this code it's used to make delete request to the server
const completeOrder = document.getElementById('deleteOrder');

const deleteReq = async (callBack) => {
    const id = completeOrder.dataset._id
    url = `../../pizza/delete-orders/${id}`;
    const res = await fetch(url, {method: 'DELETE'});
    const jsO = await res.json();
    window.location.href = jsO.redirect;
    
}

// const redirectToNewPage = (pageUrl) => {
//     window.location.href = pageUrl;
// }

completeOrder.addEventListener('click', //() => {
    // deleteReq(redirectToNewPage);
    deleteReq
).catch(err => console.log(err));
