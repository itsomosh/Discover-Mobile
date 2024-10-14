import { CategoryViewModel } from './category-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    const categoryName = page.navigationContext.category;
    page.bindingContext = new CategoryViewModel(categoryName);
}