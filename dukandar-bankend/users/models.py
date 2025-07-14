import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, MinLengthValidator
from django.db.models import CharField, BooleanField
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# Create your models here.
GenderChoice = (
    ("M","Male"),
    ("F","Female"),
    ("T","Transgender"),
    ("NA","not_to_mention"),
)

class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class User(AbstractUser, TimeStampMixin):
    name = CharField(_("Name of User"), blank=True, max_length=255)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    is_shop_owner = BooleanField(
        _('shop owner'),
        default=False,
        help_text=_(
            'If this flag is true it means user is an owner.'
        ),
    )
    
    is_customer = BooleanField(
        _('customer'),
        default=False,
        help_text=_(
            'If this flag is true it means user is a customer.'
        ),
    )
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    class Meta:
        ordering = ('-created_at',)
        

class Profile(TimeStampMixin):
    gender = models.CharField(max_length = 10, blank=True, null=True, choices=GenderChoice)
    DOB = models.DateField( blank=True, null=True )
    phone_regex = RegexValidator(
        regex=r'^\+?\d{8,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = CharField(
        validators=[phone_regex], max_length=15, unique=True, blank=False, null=True)

    address = models.CharField(max_length=255, default=None, null=True, blank=True)
    cnic = models.CharField(max_length=13,null=True, blank=True, default=None, 
                            validators=[MinLengthValidator(13)])
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                related_name="user_profile", default=None)
    def __str__(self):
        return self.user.username
    
class UersAdress(TimeStampMixin):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    label = models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    building = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length = 225)
    is_primary = models.BooleanField(default=False)
    city = models.CharField(max_length = 225)
    instructions = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.user.name