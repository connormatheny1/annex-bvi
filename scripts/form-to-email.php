<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}

$name = $_POST['name'];
$subject = $_POST['subject'];
$phone = $_POST['phone'];
$guest_email = $_POST['email'];
$message = $_POST['message'];

//Validate first
if(empty($name)||empty($guest_email)) 
{
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($guest_email))
{
    echo "Bad email value!";
    exit;
}

$email_body = "You have received a new message from: $name.\n".
    "Here is the message:\n $message \n".
    
$to = "connormatheny1@gmail.com";//<== update the email address
$headers = "From: $guest_email \r\n";
$headers .= "Reply-To: $guest_email \r\n";
//Send the email!
mail($to,$subject,$email_body,$headers);
//done. redirect to thank-you page.
echo "Message submitted, redirection...";
header('Location: ../thanks.html');


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 