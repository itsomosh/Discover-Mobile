import { ResultsViewModel } from './results-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    const searchQuery = page.navigationContext.searchQuery;
    page.bindingContext = new ResultsViewModel(searchQuery);
}