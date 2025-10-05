import { Routes } from '@angular/router';
import { OnboardingRequest } from './onboarding-request/onboarding-request';
import { Form } from './form/form';

export const routes: Routes = [
    {path: '', component: Form},
    {path: 'onboarding-request', component: OnboardingRequest}
];
