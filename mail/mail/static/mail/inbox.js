

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
    test(mailbox)

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
    .then(result => result = result)
      
       for (i = 0; i < result.length; i++){
      
        const p = document.createElement('p');
        const span = document.createElement('span');
        const span2 = document.createElement('span');
        const target = document.querySelector('#target');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');
        
        p.setAttribute('id', `firstline${i}`);
        span.setAttribute('id', `sender${i}`);
        span2.setAttribute('id', `timestamp${i}`);
        p2.setAttribute("id", `recipients${i}`);
        p3.setAttribute("id", `subject${i}`);
        p4.setAttribute("id", `body${i}`);

        target.append(p);
        p.append(span);
        p.append(span2);
        target.append(p2);
        target.append(p3);
        target.append(p4);
      
        
      document.querySelector(`#sender${i}`).innerHTML = `${result['sender']}`;
      document.querySelector(`#timestamp${i}`).innerHTML = `${result['timestamp']}`;
      document.querySelector(`#recipients${i}`).innerHTML = `${result['recipients']}`;
      document.querySelector(`#subject${i}`).innerHTML = `${result['subject']}`;
      document.querySelector(`#body${i}`).innerHTML = `${result['body']}`;
      
      }
    
  

  



  //       return  ''
    
  }
  
    
       


function get_inbox() {
  
}


//Test function to print API result to console
function test(mailbox) {
  fetch(('emails/' + mailbox)).then(emails => emails.json())
    .then(result => console.log(result));
  
}