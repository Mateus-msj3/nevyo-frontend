import {Component, Injector, ViewChild} from '@angular/core';
import {Validators} from "@angular/forms";
import {BaseResourceFormComponent} from "../../../shared/abastracts/base-resource-form.component";
import {Kit} from "../../../shared/models/kit";
import {KitService} from "../kit.service";
import {StoreStateService} from "../../../shared/services/store-state.service";
import {SelectItem} from "primeng/api";
import {FileSelectEvent, FileUpload} from "primeng/fileupload";
import {KitImage} from "../../../shared/models/kit-image";
import {Gender} from "../../../shared/enums/gender-enum";
import {Product} from "../../../shared/models/product";
import {KitProduct} from "../../../shared/models/kit-product";
import {KitAccessory} from "../../../shared/models/kit-acessory";
import {ProductService} from "../../products/product.service";
import {FilterParams} from "../../../shared/util/paginator/filterParams";
import {SortParams} from "../../../shared/util/paginator/sortParams";
import {switchMap} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {Page} from "../../../shared/util/paginator/page";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-kit-form',
  templateUrl: './kit-form.component.html',
  styleUrls: ['./kit-form.component.scss']
})
export class KitFormComponent extends BaseResourceFormComponent<Kit> {

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  activeIndex: number = 0;
  images: KitImage[] = [];
  kitProducts: KitProduct[] = [];
  accessories: KitAccessory[] = [];
  products: Product[] = [];

  genderOptions: SelectItem[] = [
    {label: 'Male', value: Gender.MASCULINO},
    {label: 'Female', value: Gender.FEMININO},
    {label: 'Unisex', value: Gender.UNISSEX},
    {label: 'Kids', value: Gender.INFANTIL}
  ];

  responsiveOptions = [
    {breakpoint: '1400px', numVisible: 3, numScroll: 1},
    {breakpoint: '1024px', numVisible: 2, numScroll: 1},
    {breakpoint: '768px', numVisible: 1, numScroll: 1}
  ];

  protected stepItems = [
    {label: 'Basic Information'},
    {label: 'Images'},
    {label: 'Products'},
    {label: 'Accessories'}
  ];

  constructor(
    protected override injector: Injector,
    public readonly kitService: KitService,
    private readonly storeStateService: StoreStateService,
    private readonly productService: ProductService
  ) {
    super(injector, new Kit(), kitService, Kit.fromJson);
  }

  protected init(): void {
    this.loadProducts();
  }

  // Correção do método loadProducts
  loadProducts(): void {
    const params = new FilterParams('0', new SortParams('name', 0));
    const selectedStore = this.storeStateService.getSelectedStore();

    this.productService.search(params, new HttpParams().set('storeId', selectedStore!.id!.toString())).subscribe(
      (page: Page<Product>) => {
        this.products = page.content;
      }
    );
  }

  protected override buildResourceForm(): void {
    const selectedStore = this.storeStateService.getSelectedStore();

    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      maxAccessories: [0, [Validators.required, Validators.min(0)]],
      gender: [null, [Validators.required]],
      active: [true],
      storeId: [selectedStore?.id?.toString()],
      store: [selectedStore],
      images: [[]],
      kitProducts: [[]],
      accessories: [[]]
    });
  }

  protected override creationPageTitle(): string {
    return 'New Kit';
  }

  protected override editionPageTitle(): string {
    return `Editing Kit: ${this.resource?.name || ''}`;
  }

  // Métodos para gerenciar imagens
  onImageSelect(event: FileSelectEvent): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore || !event.files) return;

    Array.from(event.files).forEach(file => {
      this.toBase64(file, (base64String) => {
        const image = new KitImage(
          base64String,
          this.images.length === 0, // Se for a primeira imagem, define como principal
          file.name,
          file.type
        );
        this.images.push(image);
      });
    });

    this.fileUpload.clear();
    this.resourceForm.patchValue({images: this.images});
  }

  removeImage(index: number): void {
    const removedImage = this.images[index];
    this.images.splice(index, 1);

    // Se a imagem removida era a principal e ainda existem outras imagens
    if (removedImage.mainImage && this.images.length > 0) {
      // Define a primeira imagem restante como principal
      this.images[0].mainImage = true;
    }

    this.resourceForm.patchValue({images: this.images});
  }

  setMainImage(selectedImage: KitImage): void {
    this.images = this.images.map(image => {
      image.mainImage = image === selectedImage;
      return image;
    });
    this.resourceForm.patchValue({images: this.images});
  }

  // Métodos para gerenciar produtos do kit
  addProduct(): void {
    const kitProduct = new KitProduct();
    kitProduct.required = true;
    this.kitProducts.push(kitProduct);
    this.resourceForm.patchValue({kitProducts: this.kitProducts});
  }

  removeKitProduct(index: number): void {
    this.kitProducts.splice(index, 1);
    this.resourceForm.patchValue({kitProducts: this.kitProducts});
  }

  // Métodos para gerenciar acessórios
  addAccessory(): void {
    if (this.accessories.length >= this.resourceForm.get('maxAccessories')?.value) {
      this.customMessageService.showWarning(
        'Maximum Accessories',
        'Cannot add more accessories than the maximum allowed.'
      );
      return;
    }

    const accessory = new KitAccessory();
    accessory.recommended = false;
    this.accessories.push(accessory);
    this.resourceForm.patchValue({accessories: this.accessories});
  }

  removeAccessory(index: number): void {
    this.accessories.splice(index, 1);
    this.resourceForm.patchValue({accessories: this.accessories});
  }

  private toBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  // Correção do método override loadResource
  override loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          return id ? this.resourceService.getById(id) : [];
        }),
        switchMap((resource: Kit) => {
          // Primeiro, armazena o resource
          this.resource = resource;
          this.images = resource.images || [];

          // Carrega os produtos antes de configurar kitProducts e accessories
          return this.loadProductsForEdit(resource);
        })
      ).subscribe(() => {
        // Agora que temos os produtos, podemos configurar kitProducts e accessories
        this.setupKitProducts();
        this.setupAccessories();

        this.resourceForm.patchValue({
          ...this.resource,
          store: this.resource.store,
          images: this.images,
          kitProducts: this.kitProducts,
          accessories: this.accessories
        });
      });
    }
  }

  private loadProductsForEdit(resource: Kit): Observable<void> {
    const params = new FilterParams('0', new SortParams('name', 0));
    const selectedStore = this.storeStateService.getSelectedStore();

    if (!selectedStore) {
      return of(void 0);
    }

    return this.productService.search(
      params,
      new HttpParams().set('storeId', selectedStore.id!.toString())
    ).pipe(
      map((page: Page<Product>) => {
        this.products = page.content;
      })
    );
  }

  private setupKitProducts(): void {
    this.kitProducts = (this.resource?.kitProducts || []).map(kp => {
      const kitProduct = new KitProduct();
      kitProduct.id = kp.id;
      kitProduct.required = kp.required;
      kitProduct.kitId = kp.kitId;

      // Encontra o produto completo usando o productId
      if (kp['productId']) {
        kitProduct.product = this.products.find(p => p.id === kp['productId']);
      }

      return kitProduct;
    });
  }

  private setupAccessories(): void {
    this.accessories = (this.resource?.accessories || []).map(acc => {
      const accessory = new KitAccessory();
      accessory.id = acc.id;
      accessory.description = acc.description;
      accessory.recommended = acc.recommended;
      accessory.kitId = acc.kitId;

      // Encontra o produto completo usando o productId
      if (acc['productId']) {
        accessory.product = this.products.find(p => p.id === acc['productId']);
      }

      return accessory;
    });
  }

  // Correção do método beforeSave e beforeUpdate
  public override beforeUpdate(resource: Kit): void {
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore) return;

    resource.store = selectedStore;
    this.prepareRelatedEntities(resource);
  }

  private prepareRelatedEntities(resource: Kit): void {
    // Correção para KitImage[]
    resource.images = this.images.map(image => {
        const newImage = new KitImage(
            image.imageUrl,
            image.mainImage,
            image.originalFileName,
            image.contentType,
            resource.id?.toString()
        );
        if (image.id) newImage.id = image.id;
        return newImage;
    });

    // Correção para KitProduct[]
    resource.kitProducts = this.kitProducts
        .filter(kitProduct => kitProduct.product) // Remove produtos não selecionados
        .map(kitProduct => ({
            id: kitProduct.id,
            required: kitProduct.required,
            kitId: resource.id?.toString(),
            productId: kitProduct.product?.id // Usa productId ao invés de product
        })) as KitProduct[];

    // Correção para KitAccessory[]
    resource.accessories = this.accessories
        .filter(accessory => accessory.product) // Remove acessórios sem produto
        .map(accessory => ({
            id: accessory.id,
            description: accessory.description,
            recommended: accessory.recommended,
            kitId: resource.id?.toString(),
            productId: accessory.product?.id // Usa productId ao invés de product
        })) as KitAccessory[];
}

// Modifique o método beforeSave para receber o recurso como parâmetro
  public override beforeSave(resource: Kit): void {
    // Primeiro, faça as validações
    if (this.images.length === 0) {
      this.customMessageService.showError(
        'Validation Error',
        'At least one image is required'
      );
      return;
    }

    const hasMainImage = this.images.some(img => img.mainImage);
    if (!hasMainImage) {
      this.customMessageService.showError(
        'Validation Error',
        'At least one image must be set as main image'
      );
      return;
    }

    // Se passou nas validações, continue com o processo normal
    const selectedStore = this.storeStateService.getSelectedStore();
    if (!selectedStore) return;

    resource.store = selectedStore;
    this.prepareRelatedEntities(resource);
  }
}
