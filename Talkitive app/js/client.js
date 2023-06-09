const socket=io('http://localhost:8000',{
    transports:["websocket"],
    
});
// const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageImp');
const messageContainer=document.querySelector('.container')

let audio = new Audio('ting.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left') {
        audio.play();
    }
}
const names=prompt("Enter your name to join");
socket.emit('new-user-joined',names);

socket.on('user-joined',names=>{
    append(`${names} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.names}:${data.message}`,'left')
})
socket.on('left',names=>{
    append(`${names} LEFT THE CHAT`,'right')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
