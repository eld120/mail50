

document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#submit').addEventListener('click', sendMail);
  // By default, load the inbox
  load_mailbox('inbox');
  
  
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#target').style.display = 'none';
  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  if (mailbox == 'inbox') {
    display_mailbox(mailbox)
    test(mailbox)
  }
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#target').style.display = 'block';

  // Show the mailbox name
  
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}


function sendMail() {
  const recip = document.querySelector('#compose-recipients').value;
  const subj = document.querySelector('#compose-subject').value;
  const bod = document.querySelector('#compose-body').value;
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recip,
      subject: subj,
      body: bod
    })
  }).then(response => response.json());
}

//API call to mailbox db
function display_mailbox(mailbox) {
 fetch(('emails/' + mailbox))
    .then(emails => emails.json())
    .then(result => get_inbox(result))
    }
  
 
function get_inbox(result) {
  let target = document.querySelector('#target');
  target.innerHTML = '';
  
  for (i = 0; i < result.length; i++){
    
    const link = document.createElement('a');
    link.setAttribute('class', 'link');
    link.setAttribute('href', '#');
    link.setAttribute('onclick', `return get_email(${result[i]['id']})`);

    const para1 = document.createElement('p');
    para1.setAttribute('id', `para1${i}`);

    const span1 = document.createElement('span');
    span1.setAttribute('id', `span1${i}`);

    const span2 = document.createElement('span');
    span2.setAttribute('id', `span2${i}`);
    span2.setAttribute('class', `span`);

    const para2 = document.createElement('p');
    para2.setAttribute('id', `para2${i}`);

    const para3 = document.createElement('p');
    para3.setAttribute('id', `para3${i}`);

    const para4 = document.createElement('p');
    //const hr = document.createElement('hr');

    var minidiv = document.createElement('div');
    minidiv.setAttribute('class', 'minidiv');
    if (result[i]['read'] == true) {
      minidiv.style.background = 'lightgray';
    }
    
    para4.setAttribute('id', `para4${i}`);
    target.append(link);
    link.append(minidiv)
    minidiv.append(para1, para2, para3, para4);
    para1.append(span1, span2);

    const sender = `From: ${result[i]['sender']}`;
    const timestamp = `Date: ${result[i]['timestamp']}`;
    const subject = `Subject: ${result[i]['subject']}`;
    

    document.querySelector(`#span1${i}`).innerHTML = sender;
    document.querySelector(`#span2${i}`).innerHTML = timestamp;
    document.querySelector(`#para3${i}`).innerHTML = subject;
    
 }
}


//Test function to print API result to console
function test(mailbox) {
  fetch((`emails/${mailbox}`)).then(emails => emails.json())
    .then(result => console.log(result));
}

function get_email(emailNo) {
  //TODO
  return fetch((`emails/${emailNo}`))
    .then(emails => emails.json())
    .then(result => display_email(result));
}

function display_email(result) {
  
  let target = document.querySelector('#target');
  target.innerHTML = '';

  const para1 = document.createElement('p');
  para1.setAttribute('id', `para1}`);

  const span1 = document.createElement('span');
  span1.setAttribute('id', `span1`);

  const span2 = document.createElement('span');
  span2.setAttribute('id', `span2`);
  span2.setAttribute('class', `span`);

  const para2 = document.createElement('p');
  para2.setAttribute('id', `para2`);

  const para3 = document.createElement('p');
  para3.setAttribute('id', `para3`);

  const para4 = document.createElement('p');
  const hr = document.createElement('hr');

  var minidiv = document.createElement('div');
  minidiv.setAttribute('class', 'minidiv');
  if (result['read'] == true) {
    minidiv.style.background = 'lightgray';
  } else {
    fetch(`emails/${result['id']}`, {
      method: 'PUT',
      body: JSON.stringify({
        read: true
      })
    })
     
  }
  
  para4.setAttribute('id', `para4`);
  target.append(minidiv);
  minidiv.append(para1, para2, para3, hr, para4);
  para1.append(span1, span2);

  const sender = `From: ${result['sender']}`;
  const timestamp = `Date: ${result['timestamp']}`;
  const recipients = `To: ${result['recipients']}`;
  
  const subject = `Subject: ${result['subject']}`;
  const body = `${result['body']}`;

  document.querySelector(`#span1`).innerHTML = sender;
  document.querySelector(`#span2`).innerHTML = timestamp;
  document.querySelector(`#para2`).innerHTML = recipients;
  document.querySelector(`#para3`).innerHTML = subject;
  document.querySelector(`#para4`).innerHTML = body;



}