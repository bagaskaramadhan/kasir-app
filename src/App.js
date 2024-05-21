import { CartComponent, CategoryComponent, NavbarComponent, ProductComponent } from "./components"
function App() {
  return (
    <div>
      <NavbarComponent />
      <div className='content-above-navbar'>
        <div className='col-2'>
          <CategoryComponent />
        </div>
        <div className='col-8'>
          <ProductComponent />
        </div>
        <div className='col-2'>
          <CartComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
