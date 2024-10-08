import $ from "jquery"
export const range = (start: number, end: number) => {
    const length = end - start + 1;
    /*
          Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
};

export function removeDuplicates(arr: string[]) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

export function numberWithCommas(x: number) {
    return x ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "0"
}

export const closeMenu = () => {
    $(".dropdown").removeClass("dropdown-open");
    const active = document.activeElement as HTMLElement;
    active.blur();
};