import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]', //? the square brackets allow us to use appDropDown directly instead of [appDropdown]
})
export class DropdownDirective {
  @Input('cl') className: string = '';
  constructor(private eleRef: ElementRef, private rend: Renderer2) {}

  @HostListener('click') clickFunc(e: Event) {
    console.log(
      this.eleRef.nativeElement.nextSibling.className,
      this.className
    );
    if (this.eleRef.nativeElement.nextSibling.className !== this.className) {
      this.rend.removeClass(this.eleRef.nativeElement.nextSibling, 'show');
    } else {
      this.rend.addClass(this.eleRef.nativeElement.nextSibling, 'show');
    }
  }
}
