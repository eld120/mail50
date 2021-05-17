

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

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  
  if (mailbox == 'inbox') {
    display_mailbox(mailbox)
    //test(mailbox)

  }
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

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


function display_mailbox(mailbox) {
 fetch(('emails/' + mailbox))
    .then(emails => emails.json())
    .then(result => get_inbox(result))
    }
  
  
function get_inbox(result) {
  const target = document.querySelector('#target');
  target.innerHTML = '';
  
  for (i = 0; i < result.length; i++){
    const inbox = `<p><span>${result[i]['sender']}</span><span>${result[i]['timestamp']}</span></p>
            <p>${result[i]['recipients']}</p>
            <p>${result[i]['subject']}</p>
            <p>${result[i]['body']}</p>`
    target.append(inbox)
    }
}


//Test function to print API result to console
function test(mailbox) {
  fetch(('emails/' + mailbox)).then(emails => emails.json())
    .then(result => console.log(result));
  
}