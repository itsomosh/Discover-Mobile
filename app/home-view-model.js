import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export function createViewModel() {
    const viewModel = new Observable();

    viewModel.onSearch = (args) => {
        const searchBar = args.object;
        const searchQuery = searchBar.text;
        console.log(`Searching for: ${searchQuery}`);
        
        Frame.topmost().navigate({
            moduleName: "results-page",
            context: { searchQuery: searchQuery },
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    };

    viewModel.onCategoryTap = (args) => {
        const button = args.object;
        const categoryName = button.text;
        console.log(`Category tapped: ${categoryName}`);
        
        Frame.topmost().navigate({
            moduleName: "category-page",
            context: { category: categoryName },
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    };

    return viewModel;
}