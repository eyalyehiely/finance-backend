from django.db import models
import uuid



class Family(models.Model):
    family_id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    family_name = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_expenses_calculation(self):
        from backend.models import CreditCard, Debts
        credit_card_expenses = 0.0
        debts_expenses = 0.0


        credit_cards = CreditCard.objects.filter(family_id=self.family_id)
        for card in credit_cards:
            credit_card_expenses += card.amount_to_charge

        # loans = Loans.objects.filter(family_id=self.family_id)
        # for loan in loans:
        #     loans_expenses += loan.month_payment

        debts = Debts.objects.filter(family_id=self.family_id)
        for debt in debts:
            debts_expenses += debt.month_payment

        total_expenses = credit_card_expenses  + debts_expenses
        return total_expenses

    @property
    def total_savings_calculation(self):
        from backend.models import Savings
        total_savings = 0.0
        savings = Savings.objects.filter(family_id=self.family_id)
        for saving in savings:
            total_savings += saving.amount
        return total_savings

    @property
    def credit_cards_expenses(self):
        from backend.models import CreditCard
        credit_card_expenses = 0.0
        credit_cards = CreditCard.objects.filter(family_id=self.family_id)
        for card in credit_cards:
            credit_card_expenses += card.amount_to_charge
        return credit_card_expenses

    def total_income_calculation(self):
        from backend.models import Revenues
        total_income = 0.0
        revenues = Revenues.objects.filter(family_id = self.family_id)
        for revenue in revenues:
            total_income += revenue.amount
        return total_income


    @property
    def is_negative(self):
        if self.total_income_calculation() < + self.total_expenses_calculation:
            return True
        else:
            return False
