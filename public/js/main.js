const socket = io();

socket.on('connect', () => {
    console.log('Sockets online');
});

socket.on('disconnect', () => {
    console.log('Sockets offline');
});

socket.on('new_message', data => {
    console.log('Nuevo SMS');
    console.log(data);

    const messagesList = document.getElementById('messages');

    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-warning list-group-item-action';

    const p = document.createElement('p');
    p.appendChild(document.createTextNode(data.msg));

    const from = document.createElement('span');
    from.appendChild(document.createTextNode(data.from));

    const _id = document.createElement('span');
    _id.appendChild(document.createTextNode(data._id));

    li.appendChild(p);
    li.appendChild(_id);
    li.appendChild(from);
    messagesList.prepend(li);
});