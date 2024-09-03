import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2024-06-20',
    });
  }

  async createCustomer(email: string, name: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({ email, name });
  }

  async savePaymentMethod(
    email: string,
    name: string,
    paymentMethodId: string,
  ) {
    const customer = await this.stripe.customers.create({
      payment_method: paymentMethodId,
      email: email,
      name: name,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return customer.id;
  }

  async retrievePaymentMethod(
    paymentMethodId: string,
  ): Promise<Stripe.PaymentMethod> {
    return this.stripe.paymentMethods.retrieve(paymentMethodId);
  }

  // SetupIntent operations
  async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    return this.stripe.setupIntents.create({
      customer: customerId,
      usage: 'off_session',
    });
  }

  async confirmSetupIntent(
    setupIntentId: string,
    paymentMethodId: string,
  ): Promise<Stripe.SetupIntent> {
    return this.stripe.setupIntents.confirm(setupIntentId, {
      payment_method: paymentMethodId,
    });
  }

  // PaymentIntent operations
  async createPaymentIntent(
    amount: number,
    currency: string,
    customerId: string,
    paymentMethodId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.confirm(paymentIntentId);
  }
}
