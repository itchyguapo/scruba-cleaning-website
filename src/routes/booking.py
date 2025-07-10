from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/book', methods=['POST'])
def book_service():
    try:
        # Get form data
        data = request.get_json()
        
        # Extract booking information
        customer_name = data.get('name', '')
        customer_email = data.get('email', '')
        customer_phone = data.get('phone', '')
        service_type = data.get('service_type', '')
        property_size = data.get('property_size', '')
        service_frequency = data.get('frequency', '')
        preferred_date = data.get('preferred_date', '')
        preferred_time = data.get('preferred_time', '')
        special_requirements = data.get('special_requirements', '')
        estimated_price = data.get('estimated_price', '')
        
        # Create email content
        subject = f"New Booking Request - {customer_name}"
        
        email_body = f"""
        NEW BOOKING REQUEST - SCRUBA CLEANING SERVICES
        
        Customer Information:
        - Name: {customer_name}
        - Email: {customer_email}
        - Phone: {customer_phone}
        
        Service Details:
        - Service Type: {service_type}
        - Property Size: {property_size}
        - Frequency: {service_frequency}
        - Preferred Date: {preferred_date}
        - Preferred Time: {preferred_time}
        - Estimated Price: ₦{estimated_price}
        
        Special Requirements:
        {special_requirements if special_requirements else 'None specified'}
        
        Booking submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        Please contact the customer to confirm the booking details.
        """
        
        # Send email notification
        send_booking_email(subject, email_body, customer_email, customer_name)
        
        return jsonify({
            'success': True,
            'message': 'Booking request submitted successfully! We will contact you shortly to confirm your appointment.'
        })
        
    except Exception as e:
        print(f"Error processing booking: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'There was an error processing your booking. Please try again or call us directly.'
        }), 500

def send_booking_email(subject, body, customer_email, customer_name):
    """
    Send booking notification email to Scruba Cleaning Services
    Note: This is a simplified version. In production, you would use a proper email service
    like SendGrid, Mailgun, or configure SMTP with your email provider.
    """
    try:
        # Email configuration (you'll need to update these with actual email settings)
        smtp_server = "smtp.gmail.com"  # Update with your SMTP server
        smtp_port = 587
        sender_email = "your-email@gmail.com"  # Update with your email
        sender_password = "your-app-password"  # Update with your app password
        recipient_email = "scrubaserviceslimited@gmail.com"
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        
        # Add body to email
        msg.attach(MIMEText(body, 'plain'))
        
        # Gmail SMTP configuration
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Enable security
        server.login(sender_email, sender_password)
        
        # Send email
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        print(f"Booking notification sent successfully for {customer_name}")
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        # In production, you might want to log this to a file or monitoring service
        # For now, we'll just print the error but still return success to the user
        pass

@booking_bp.route('/contact', methods=['POST'])
def contact_form():
    """Handle general contact form submissions"""
    try:
        data = request.get_json()
        
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        message = data.get('message', '')
        
        subject = f"Contact Form Submission - {name}"
        
        email_body = f"""
        NEW CONTACT FORM SUBMISSION - SCRUBA CLEANING SERVICES
        
        Contact Information:
        - Name: {name}
        - Email: {email}
        - Phone: {phone}
        
        Message:
        {message}
        
        Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        send_booking_email(subject, email_body, email, name)
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! We will get back to you soon.'
        })
        
    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'There was an error sending your message. Please try again or call us directly.'
        }), 500

