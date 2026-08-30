<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST['website'])) {
    header("Location: thankyou.html"); 
    exit();
}
    $fullName = htmlspecialchars(trim($_POST['fullName'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $businessName = htmlspecialchars(trim($_POST['businessName'] ?? ''));
    $businessStage = htmlspecialchars(trim($_POST['businessStage'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Email Configuration
    $to = "hello@thewowtribe.com";
    $subject = "New Wow Tribe Lead";
    
    // Email Content
    $email_content = "New Lead Application for The Wow Tribe\n\n";
    $email_content .= "Full Name: " . $fullName . "\n";
    $email_content .= "Email Address: " . $email . "\n";
    $email_content .= "Phone Number: " . $phone . "\n";
    $email_content .= "Business Name: " . $businessName . "\n";
    $email_content .= "Business Stage: " . $businessStage . "\n\n";
    $email_content .= "Message / Goals:\n" . $message . "\n";

    // Headers
    $headers = "From: noreply@wowbians.massaratkang.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send Email
    if (mail($to, $subject, $email_content, $headers)) {
        // Redirect to Thank You page on success
        header("Location: thankyou.html");
        exit();
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Not a POST request, redirect back to contact page
    header("Location: contact.html");
    exit();
}
?>
