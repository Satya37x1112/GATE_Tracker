from django.core import mail
from django.test import Client, TestCase, override_settings
from django.urls import reverse

from .models import Feedback


@override_settings(
    EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    ADMIN_EMAIL='admin@example.com',
    DEFAULT_FROM_EMAIL='no-reply@example.com',
)
class FeedbackViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_feedback_submission_creates_record(self):
        response = self.client.post(reverse('tracker:feedback'), {
            'name': 'Asha',
            'email': 'asha@example.com',
            'message': 'Please add a weekly goals widget.',
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(Feedback.objects.count(), 1)
        feedback = Feedback.objects.get()
        self.assertEqual(feedback.name, 'Asha')
        self.assertEqual(feedback.upvotes, 0)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['admin@example.com'])
        self.assertIn('Asha', mail.outbox[0].body)
        self.assertIn('asha@example.com', mail.outbox[0].body)
        self.assertIn('Please add a weekly goals widget.', mail.outbox[0].body)
        self.assertIn('Submission time:', mail.outbox[0].body)

    def test_feedback_requires_message(self):
        response = self.client.post(reverse('tracker:feedback'), {
            'name': 'Asha',
            'email': 'asha@example.com',
            'message': '',
        })

        self.assertEqual(response.status_code, 400)
        self.assertContains(response, 'Please share a feedback message before submitting.')
        self.assertEqual(Feedback.objects.count(), 0)

    def test_feedback_upvote_increments_counter(self):
        feedback = Feedback.objects.create(message='Show more peer ideas')

        response = self.client.post(reverse('tracker:feedback_upvote', args=[feedback.id]))

        self.assertEqual(response.status_code, 302)
        feedback.refresh_from_db()
        self.assertEqual(feedback.upvotes, 1)
