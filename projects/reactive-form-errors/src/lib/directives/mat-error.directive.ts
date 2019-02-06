import { Directive, TemplateRef, EmbeddedViewRef, ViewContainerRef, OnDestroy, AfterContentInit, Input, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material';
import { ValidationErrors } from '@angular/forms';

import { FORM_DEFAULT_ERRORS } from '../tokens';

interface MatErrorContext {
    $implicit: string;
    matError: string;
}

@Directive({ selector: '[matError]' })
export class MatErrorDirective implements AfterContentInit, OnDestroy {
    @Input() matError: any;

    get control(): MatFormFieldControl<any> {
        return this.host._control;
    }

    get ngControl(): NgControl {
        return this.control.ngControl;
    }

    get errors(): ValidationErrors {
        return this.ngControl.errors;
    }

    get errorMessage(): string {
        const [key, error] = Object.entries(this.errors)[0];
        return this.defaultErrors[key](error);
    }

    private context: MatErrorContext = {
        $implicit: null,
        matError: null
    };
    private view: EmbeddedViewRef<MatErrorContext>;

    constructor(
        private host: MatFormField,
        private container: ViewContainerRef,
        private template: TemplateRef<MatErrorContext>,
        @Inject(FORM_DEFAULT_ERRORS) private defaultErrors
    ) {}

    ngAfterContentInit() {
        this.ngControl.valueChanges.subscribe(() => {
            const error = this.errorMessage;
            if (error) {
                this.showError(error);
            } else {
                this.hideError();
            }
        });
    }

    ngOnDestroy() {
        this.destroy();
    }

    private showError(error: string) {
        this.destroy();
        this.context.$implicit = this.context.matError = error;
        this.view = this.container.createEmbeddedView(this.template, this.context);
    }
    private hideError() {
        this.destroy();
    }

    private destroy() {
        if (this.view) {
            this.view.destroy();
            this.view = null;
        }
    }
}