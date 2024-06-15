from django.db import models
from django.db.models import Sum

from users.family_models import Family
from users.models import CustomUser
import datetime
from django.utils import timezone
from django.conf import settings
import uuid


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,)
    created_at = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Savings(BaseModel):
    SAVING_TYPES = [
        ('health', 'בריאות'),
        ('business', 'עסקים'),
        ('regular', 'רגיל'),
        ('education','השכלה'),
        ('other','אחר'),
    ]
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='savings')
    family_id = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='savings',blank=True, null=True)
    saving_type = models.CharField(max_length=50, choices=SAVING_TYPES)
    interest = models.FloatField()
    amount = models.FloatField()
    starting_date = models.DateField()
    finish_date = models.DateField()

    def __str__(self):
        return f"{self.saving_type},{self.amount}"
    

    @property
    def num_of_months(self):
        start_date = self.starting_date
        num_months = (self.finish_date.year - start_date.year) * 12 + self.finish_date.month - start_date.month
        return num_months

    @property
    def total_saving_amount(self):
        principal = self.amount
        interest_rate = self.interest
        num_of_months = self.num_of_months
        monthly_interest_rate = (interest_rate) / 100 / 12
        total_amount = principal

        for _ in range(num_of_months):
            interest_amount = total_amount * monthly_interest_rate
            total_amount += interest_amount

        return total_amount
    
    @property
    def earnings(self):
        num_months = (datetime.date.today().year - self.starting_date.year) * 12 + datetime.date.today().month - self.starting_date.month
        earnings = self.amount * (self.interest / 100) * (num_months / 12)
        
        return earnings
#___________________________________________________________



    
#___________________________________________________________

#3
class Debts(BaseModel):
    DEBT_TYPES = [
        ('mortgage', 'משכנתא'),
        ('goverment', 'ממשלתית'),
        ('loan', 'הלוואה'),
        ('business', 'עסק'),
        ('medical', 'רפואי'),
        ('car', 'משכון רכב'),
        
    ]
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='debts')
    family_id = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='debts',blank=True, null=True)
    type = models.CharField(max_length=50, choices=DEBT_TYPES)
    name = models.TextField(max_length=100)
    amount = models.FloatField()
    line_of_debt = models.FloatField()
    interest = models.FloatField()
    starting_date = models.DateField()
    finish_date = models.DateField()

    @property
    def payed_amount(self):
        calc_months = datetime.date.today().month - self.created_at.month
        payed_amount = (self.total_amount/self.num_of_months) * calc_months
        return payed_amount

    @property
    def month_payment(self):
        month_payment = float(self.total_amount / self.num_of_months)
        return month_payment

    @property
    def month_payed(self):
        num_month_payed = datetime.date.today().month - self.created_at.month
        return num_month_payed

   

    @property
    def num_of_months(self):
        start_date = self.starting_date
        num_months = (self.finish_date.year - start_date.year) * 12 + self.finish_date.month - start_date.month
        return num_months

    @property
    def total_amount(self):
        principal = self.amount
        interest_rate = self.interest
        num_of_months = self.num_of_months
        monthly_interest_rate = (interest_rate) / 100 / 12
        total_amount = principal

        for _ in range(num_of_months):
            interest_amount = total_amount * monthly_interest_rate
            total_amount += interest_amount

        return total_amount



   

#___________________________________________________________


class CreditCard(BaseModel):
    DAY_OF_CHARGE = [
        ('type1', '2'),
        ('type2', '10'),
        ('type3', '15'),
        ('type4', 'none'),
    ]
    CARD_NAME = [
        ('no_card', 'no_card'),
        ('Visa', 'Visa'),
        ('Mastercard', 'Mastercard'),
        ('American Express', 'American Express'),
        ('Diners', 'Diners'),
    ]
    CREDIT_TYPE = [
        ('Debit', 'Debit'),
        ('Credit', 'Credit'),

    ]
    STATUS = [
        ('Active', 'Active'),
        ('Blocked', 'Blocked'),
    ]
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='CreditCard')
    family_id = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='CreditCard',blank=True, null=True)
    name = models.TextField(max_length=50, choices=CARD_NAME)
    day_of_charge = models.CharField(max_length=50, choices=DAY_OF_CHARGE)
    credit_type = models.TextField(max_length=50, choices=CREDIT_TYPE)
    line_of_credit = models.FloatField(blank=True, null=True)
    last_four_digits = models.TextField(max_length=100)
    status = models.CharField(max_length=50, choices=STATUS)


    @property
    def amount_to_charge(self):
        expenses_sum = 0.0
        expenses = Expenses.objects.filter(family_id=self.family_id, payment_method = 'credit_card')
        for expense in expenses:
            expenses_sum += expense.price
        return expenses_sum

#credit card status
    @property
    def rate(self):
        if (self.amount_to_charge < self.line_of_credit):
            return True
        else:
            return False


    # until the end of the previous month - calc the expenses
    @property
    def depending_charges(self):
        current_month = timezone.now().month
        total_depending_charges = 0
        expenses = Expenses.objects.filter(family_id=self.family_id, payment_method = 'credit_card')
        for expense in expenses:
            if (expense.created_at.month == current_month):
                total_depending_charges += expense.price
        return total_depending_charges

    # @property
    # def credit_left(self):
    #     total_credit_card_expenses = 0
    #     credit_card_expenses = Expenses.objects.filter(family_id=self.family_id,payment_method = 'credit_card')
    #     for expense in credit_card_expenses:
    #         total_credit_card_expenses += expense.price
    #         credit_left:float = self.line_of_credit - total_credit_card_expenses
    #     return credit_left





#___________________________________________________________


class Expenses(BaseModel):

    EXPENSES_TYPES = [
        ('regular_expense', 'הוצאה רגילה'),
        ('irregular_expense', 'הוצאה לא רגילה')
    ]
    PAYMENT_METHODS = [
        ('credit_card', 'כרטיס אשראי'),
        ('direct_debit', 'הוראת קבע'),
        ('transaction', 'העברה בנקאית'),
        ('cash', 'מזומן'),
        ('check', 'צ׳ק'),
    ]

    CATEGORY_TYPES = [
        ('supermarket','סופר'),
        ('restaurant','מסעדה'),
        ('tech','טכנולוגיה'),
        ('dress_and_shoes','הלבשה והנעלה'),
        ('fuel','דלק'),
        ('loan','הלוואה'),
        ('debt', 'חוב'),
        ('gift','מתנה')


    ]
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='expenses')
    family_id = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='expenses',blank=True, null=True)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHODS)
    expense_type = models.CharField(max_length=50, choices=EXPENSES_TYPES)
    date_and_time = models.DateTimeField()
    name = models.CharField(max_length=100)
    category = models.TextField(max_length=50, choices=CATEGORY_TYPES)
    price = models.FloatField()
    credit_card = models.ForeignKey(CreditCard, on_delete=models.CASCADE,null=True, blank=True, related_name='expenses',default=None)


    @property
    def total_expense(self):
        top_expenses = Expenses.objects.all()
        total = 0
        for top_expense in top_expenses:
            total += top_expense.price
        return total


class Revenues(BaseModel):
    SOURCES_TYPES = [
        ('salary', 'משכורת'),
        ('allowance', 'קצבה'),
        ('other', 'אחר'),
    ]
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='revenue')
    family_id = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='revenue',blank=True, null=True)
    source = models.CharField(max_length=50, choices=SOURCES_TYPES)
    amount = models.FloatField()
    date = models.DateField()

#___________________________________________________________

# class account(BaseModel):
#     name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='account_name')
#     business = models.ForeignKey(Business, on_delete=models.CASCADE)
#     expenses = models.ForeignKey(Expenses, on_delete=models.CASCADE)
#     credit_cards = models.ForeignKey(CreditCard, on_delete=models.CASCADE)
#     Debt = models.ForeignKey(Debt, on_delete=models.CASCADE)
#     loans = models.ForeignKey(Loan, on_delete=models.CASCADE)
#     savings = models.ForeignKey(Saving, on_delete=models.CASCADE)
#     def __str__(self):
#         return str(self.name), str(self.business), str(self.expenses), str(self.credit_cards), str(self.Debt), str(self.loans), str(self.savings)

#TODO: set account model
