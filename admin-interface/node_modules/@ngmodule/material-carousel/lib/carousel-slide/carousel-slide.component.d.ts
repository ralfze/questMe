import { ListKeyManagerOption } from '@angular/cdk/a11y';
import { OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatCarouselSlide } from './carousel-slide';
import * as ɵngcc0 from '@angular/core';
export declare class MatCarouselSlideComponent implements ListKeyManagerOption, MatCarouselSlide, OnInit {
    sanitizer: DomSanitizer;
    image: SafeStyle;
    overlayColor: string;
    hideOverlay: boolean;
    disabled: boolean;
    templateRef: TemplateRef<any>;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<MatCarouselSlideComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<MatCarouselSlideComponent, "mat-carousel-slide", never, { "overlayColor": "overlayColor"; "hideOverlay": "hideOverlay"; "disabled": "disabled"; "image": "image"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=carousel-slide.component.d.ts.map