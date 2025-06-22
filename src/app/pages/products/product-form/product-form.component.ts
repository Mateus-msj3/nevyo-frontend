import {Component, Injector} from '@angular/core';
import {FormArray, Validators} from "@angular/forms";
import {BaseResourceFormComponent} from "../../../shared/abastracts/base-resource-form.component";
import {Product} from "../../../shared/models/product";
import {ProductService} from "../product.service";
import {StoreStateService} from "../../../shared/services/store-state.service";
import {Category} from "../../../shared/models/category";
import {SelectItem} from "primeng/api";
import {FileSelectEvent} from "primeng/fileupload";
import {ProductImage} from "../../../shared/models/product-image";
import {ProductSize} from "../../../shared/models/product-size";
import {Gender} from "../../../shared/enums/gender-enum";
import {FilterParams} from "../../../shared/util/paginator/filterParams";
import {HttpParams} from "@angular/common/http";
import {Page} from "../../../shared/util/paginator/page";
import {SortParams} from "../../../shared/util/paginator/sortParams";
import {CategorySharedService} from "../../../shared/services/category-shared.services";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends BaseResourceFormComponent<Product> {

  filterParams: FilterParams = new FilterParams('0', new SortParams('name', 0));
  httpParams: HttpParams = new HttpParams();

  activeIndex: number = 0;
  categories: Category[] = [];
  images: ProductImage[] = [];
  sizes: ProductSize[] = [];

  genderOptions: SelectItem[] = [
    { label: 'Male', value: Gender.MASCULINO },
    { label: 'Female', value: Gender.FEMININO },
    { label: 'Unisex', value: Gender.UNISSEX },
    { label: 'Kids', value: Gender.INFANTIL }
  ];

  standardSizes: SelectItem[] = ['PP', 'P', 'M', 'G', 'GG', 'XG'].map(size => ({
    label: size,
    value: size
  }));

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    protected override injector: Injector,
    public readonly productService: ProductService,
    private readonly storeStateService: StoreStateService,
    private readonly categorySharedService: CategorySharedService
  ) {
    super(injector, new Product(), productService, Product.fromJson);
  }

  protected init(): void {
    this.loadCategories(this.filterParams, this.httpParams);
  }

  loadCategories(filter: FilterParams, params: HttpParams) {
    this.categorySharedService.loadCategories(filter, params).subscribe((categories: Page<Category>) => {
      this.categories = categories.content;
    });
  }

  protected override buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();

    this.resourceForm = this.formBuilder.group({
      id: [null],
      sku: [{ value: null, disabled: true }],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      quantityStore: [0, [Validators.required, Validators.min(0)]],
      quantitySite: [0, [Validators.required, Validators.min(0)]],
      gender: [null, [Validators.required]],
      isAccessory: [false],
      active: [true],
      categoryId: [null, [Validators.required]],
      storeId: [selectedStore?.id?.toString()],
      category: [null],
      store: [selectedStore],
      sizes: [[]],
      images: [[]]
    });
  }

  protected override creationPageTitle(): string {
    return 'New Product';
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource?.name || "";
    return "Editing Product: " + resourceName;
  }

  public override beforeUpdate(resource: Product): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore) return;

    this.sizes = this.sizes.map(size => {
      const newSize = new ProductSize(
        size.size,
        size.stock,
        size.productId,
        selectedStore
      );
      if (size.id) newSize.id = size.id;
      return newSize;
    });

    this.images = this.images.map(image => {
      const newImage = new ProductImage(
        image.imageUrl,
        image.description,
        image.productId,
        selectedStore
      );
      if (image.id) newImage.id = image.id;
      return newImage;
    });

    resource.sizes = this.sizes;
    resource.images = this.images;
    resource.store = selectedStore;
    resource.category = resource.category?.id ?
      new Category(undefined, undefined, selectedStore) : undefined;
    if (resource.category) {
      resource.category.id = this.resourceForm.get('categoryId')?.value;
    }
  }

  public override beforeSave(resource: Product): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore) return;

    this.sizes = this.sizes.map(size => {
      const newSize = new ProductSize(
        size.size,
        size.stock,
        undefined,
        selectedStore
      );
      return newSize;
    });

    this.images = this.images.map(image => {
      const newImage = new ProductImage(
        image.imageUrl,
        image.description,
        undefined,
        selectedStore
      );
      return newImage;
    });

    resource.sizes = this.sizes;
    resource.images = this.images;
    resource.store = selectedStore;
    resource.category = new Category(undefined, undefined, selectedStore);
    resource.category.id = this.resourceForm.get('categoryId')?.value;
  }

  override loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(params!.get('id')!))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.images = resource.images || [];
          this.sizes = resource.sizes || [];

          this.resourceForm.patchValue({
            ...resource,
            categoryId: resource.category?.id,
            category: resource.category,
            store: resource.store,
            sizes: this.sizes,
            images: this.images
          });
        }
      );
    }
  }

  public override submitForm() {
    if (this.resourceForm.valid) {
      const formData = this.resourceForm.value;
      const product = Product.fromJson(formData);

      product.sizes = this.sizes;
      product.images = this.images;

      try {
        if (this.currentAction === 'edit') {
          this.beforeUpdate(product);
          this.updateResource();
        } else {
          this.beforeSave(product);
          this.createResource();
        }
      } catch (error) {
        console.error('Erro ao processar o formulário:', error);
        this.customMessageService.showError('Erro', 'Ocorreu um erro ao processar o formulário');
      }
    }
  }

  addSize(): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore) return;

    const size = new ProductSize(
      '',
      0,
      undefined,
      selectedStore
    );
    this.sizes.push(size);
  }

  removeSize(index: number): void {
    this.sizes.splice(index, 1);
  }

  onImageSelect(event: FileSelectEvent): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore || !event.files) return;

    Array.from(event.files).forEach(file => {
      this.toBase64(file, (base64String) => {
        const image = new ProductImage(
          base64String,
          file.name,
          undefined,
          selectedStore
        );
        this.images.push(image);
      });
    });
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    const imagesFormArray = this.resourceForm.get('images') as FormArray;
    imagesFormArray.removeAt(index);
  }

  private toBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

}
