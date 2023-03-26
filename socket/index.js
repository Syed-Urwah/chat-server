const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:5173",
    },
});

let users = []

function addUsers(socketId, userId){
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}
function removeUser(socketId){
    users = users.filter((user) => user.socketId !== socketId);
  };

function getUser(userId){
    return users.find((user)=>user.userId === userId);
}  

io.on('connection', (socket) => {
    console.log('a user connected');
    //taking addUsers from client
    socket.on('addUsers', (userId)=>{
        addUsers(socket.id, userId)
        //giving users to client
        io.emit('users', users);
    })

    //send and recieve message
    socket.on('sendMessage' , ({senderId, receiverId, text, conversationId})=>{
        const user = getUser(receiverId);
        const sender = getUser(senderId)
        console.log(senderId);
        user&&io.to(user.socketId).emit("getMessage", {senderId, text, conversationId});
        sender&&io.to(sender.socketId).emit("getMessage", {senderId, text, conversationId});
    })

    //send and recieve conversation
    socket.on('sendConversation', id =>{
        console.log(id);
    })

    //when user disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('users', users)
      });
});  