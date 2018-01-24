import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

import { Config } from "../shared/config";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Car } from "./shared/car-model";
import { CarService } from "./shared/car-service";

/* ***********************************************************
* This is the master list view model.
*************************************************************/
export class CarsListViewModel extends Observable {
    @ObservableProperty() cars: ObservableArray<Car>;
    @ObservableProperty() isLoading: boolean;

    private _carService: CarService;

    constructor() {
        super();

        this.cars = new ObservableArray<Car>([]);
        this.isLoading = false;

        this._carService = CarService.getInstance();
    }

    load(): void {
        this.isLoading = true;

        this._carService.load()
            .finally(() => this.isLoading = false)
            .subscribe((cars: Array<Car>) => {
                this.cars = new ObservableArray(cars);
                this.isLoading = false;
            });
    }
}
