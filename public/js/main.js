(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const nName = "julio";

	let messageList = document.querySelector('ul'),
			chatForm 	= document.querySelector('form'),
			nameInput	= document.querySelector('.nickname'),
			nickName 	= null,
			chatMessage = chatForm.querySelector('.message'),
			status = document.getElementById("status");

	function setNickname() {
		nickName = this.value;
	}

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';
		msg = `<label class="username">${nickName}</label><label class="content">: ${chatMessage.value}</label>`;

		socket.emit('chat message', msg);
		chatMessage.value = '';
		status.innerHTML = '';
		return false;
	}

	function appendMessage(msg) {
		// will it get passed thru?
		debugger;
		let newMsg = `<li class="newMsg">${msg.message}</li>`
		messageList.innerHTML += newMsg;
	}

	function appendDMessage(msg) {
		let newMsg = `<li>${msg}</li>`
		messageList.innerHTML += newMsg;
	}
	
	function typing(){
		if(chatMessage.value !== ""){
			if(nickName && nickName.length > 0){
				isTyping = nickName + " is typing...";
				socket.emit('event', isTyping);
			}
			else{
				isTyping = "User is typing...";
				socket.emit('event', isTyping);
			}
		}
	}

	function newStatus(isTyping){
		debugger;
		let newType =  `<p>${isTyping.message}</p>`;
		status.innerHTML = newType;
	}
	chatMessage.addEventListener('keyup', typing, false);
	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
	status.addEventListener('event', newStatus, false);
})();
