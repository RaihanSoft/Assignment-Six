// ! category Butoon section Starts Here 
const categoryBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategory(data.categories)
}

const displayCategory = (datas) => {

    const titleBtn = document.getElementById('titleBtn')
    datas.forEach(data => {
        const div = document.createElement('div')
        div.classList = "hover:bg-gradient-to-t from-white to-gray-200 rounded-full "

        div.innerHTML =

            `

            <div id='btn-${data.category}' onclick="showCategory('${data.category}')" class="flex categoty-Active items-center md:text-xl font-bold cursor-pointer gap-3 border-2 p-3 px-8 rounded-full "><img class='w-10' src="${data.category_icon}" alt="">  ${data.category}</div>
                   
        `
        titleBtn.appendChild(div)

    })
}

categoryBtn()
// ! category Butoon section Ends Here 

// ! all data load


const AllData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    displayAllData(data.pets)


}

const closeModal = (button) => {
    const modal = document.getElementById('adoptModal');


    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');


    button.innerHTML = 'Adopted';
    button.classList.add('btn-disabled');
    button.onclick = null;
};

// ! adopt modal 

const adopt = (button) => {
   
    const modal = document.getElementById('adoptModal');
    const timerDisplay = document.getElementById('timer');


    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    let countdown = 3;
    timerDisplay.textContent = countdown;


    const interval = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            closeModal(button);
        }
    }, 1000);


    document.getElementById('closeModal').onclick = () => {
        clearInterval(interval);
        closeModal(button);
    };
};

// ! adopt modal  end



const displayAllData = (allDatas) => {
    const allDataContainer = document.getElementById('allDataContainer');
    allDataContainer.innerHTML = '';

    allDatas.forEach(allData => {
        const { image, pet_name, breed, date_of_birth, gender, price, petId } = allData;
        const div = document.createElement('div');

        div.innerHTML = `
            <div class="card card-compact bg-base-100 p-3 border-2">
                <figure class="h-60 rounded-xl">
                    <img class='h-full object-cover' src="${image}" alt="${pet_name}" />
                </figure>
                <div class="mt-5 px-2 space-y-1">
                    <h2 class="text-2xl font-bold">${pet_name}</h2>
                                              
                    <div class="flex items-center justify-normal gap-1">
                    
                    <img class="h-5 w-4" src="https://img.icons8.com/?size=24&id=115909&format=png">
                     <p class="text-[16px] font-medium">Breed: ${breed ? breed :  "Not Available"}</p>
                    </div>
                    
                    <div class="flex items-center justify-normal gap-1">
                    
                    <img class="h-5" src="https://img.icons8.com/?size=24&id=84997&format=png">
                    <p class="text-[16px] font-medium">Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
                    
                    
                    </div>

                    <div class="flex items-center justify-normal gap-1">
                    
                    <img class="h-5" src="https://img.icons8.com/?size=50&id=36602&format=png">
                       <p class="text-[16px] font-medium">Gender: ${gender ? gender :  "Not Available"}</p>
                    
                    
                    </div>

                    <div class="flex items-center justify-normal gap-1 pb-2">
                    
                    <img class="h-5" src="https://img.icons8.com/?size=24&id=85801&format=png">
                             <p class="text-[16px] font-medium">Price: ${price != null ? price : "Not Available"}</p>
                    
                    </div>
                    <hr/>
                    
                    <div class=" grid grid-cols-3 justify-between pt-2 space-x-1">

                       <div onclick="likePet('${image}')" class="btn border-2 bg-white hover:bg-[#0E7A81] hover:text-white border-[#0E7A8126] "><i class="ri-thumb-up-line text-2xl"></i></div>
                        <div onclick="adopt(this)" class="btn border-2 bg-white font-bold sm:text-lg hover:bg-[#0E7A81] text-[#0E7A81] hover:text-white border-[#0E7A8126]">Adopt</div>
                        <div onclick="showDetails('${petId}')" class="btn border-2 sm:text-lg font-bold bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-[#0E7A8126]">Details</div>

                    </div>
                </div>
            </div>
        `;
        allDataContainer.appendChild(div);
    });
};


AllData()

// ! details ..........
const showDetails = async (modal) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${modal}`)
    const data = await res.json()
    displayModal(data.petData)


}


const displayModal = (data) => {

    const modal = document.getElementById('modalContainer')

    modal.innerHTML =

        `
    <dialog id="my_modal_1" class="modal">

                <div class="modal-box">
              
               <div class="h-[300px]">


                <img class="h-full w-full object-cover" src="${data.image}">
               
               
               </div>
            
                <div class="space-y-3 mt-3" >

                            <h2 class="text-2xl font-bold">${data.pet_name}</h2>


                            <div class="grid grid-cols-1 sm:grid-cols-2">

                           <div class="space-y-2">
                               <p class="text-[16px] font-medium flex gap-2 items-center">
                                   <img src="https://img.icons8.com/?size=24&id=115909&format=png" class="h-5"> 
                                   Breed: ${data.breed ? data.breed : "Not Available"}
                               </p>
                               <p class="text-[16px] font-medium flex gap-2 items-center">
                                   <img class="h-5" src="https://img.icons8.com/?size=50&id=36602&format=png">
                                   Gender: <span>${data.gender ? data.gender : "Not Available"}</span>
                               </p>
                               <p class="text-[16px] font-medium flex gap-2 items-center">
                                   <img class="h-5" src="https://img.icons8.com/?size=50&id=36602&format=png">
                                   Vaccinated status: ${data.vaccinated_status ? data.vaccinated_status : "Not Available"}
                               </p>
                           </div>
                           
                           <div class="space-y-2 mt-2 sm:mt-0">
                               <p class="text-[16px] font-medium flex gap-2 items-center">
                                   <img class="h-5" src="https://img.icons8.com/?size=24&id=84997&format=png">
                                   Birth: ${data.date_of_birth ? data.date_of_birth : "Not Available"}
                               </p>
                               <p class="text-[16px] font-medium flex gap-2 items-center">
                                   <img class="h-5" src="https://img.icons8.com/?size=24&id=85801&format=png">
                                   Price: ${data.price !== null && data.price !== undefined ? data.price : "Not Available"}
                               </p>
                           </div>
                           

                            
                            
                            
                            </div>

                            <h2 class="font-bold text-xl" >Details Information</h2>
                            <p>${data.pet_details}</p>


        
                </div>



                    <div class=" items-center justify-center flex mt-5">
                        <form method="dialog" class="w-[450px]">
                            <button class=" cursor-pointer border-2 duration-500 ease-in-out border-[#0E7A81] w-full py-2 bg-white hover:bg-[#0E7A81] hover:text-white rounded-full text-lg text-[#0E7A81]">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

    `
    my_modal_1.showModal()

}


// ! like pet starts here

function likePet(img) {
    const likeContainer = document.getElementById('likeContainer')
    const div = document.createElement('div')
    div.innerHTML =

        `
      <div><img class="rounded-lg" src="${img}" alt=""></div>

   `
    likeContainer.appendChild(div)
}
// ! like pet ends here

const removeActiveClass = () => {
    const RemoveBtn = document.getElementsByClassName('categoty-Active')
    for (const btn of RemoveBtn) {
        btn.classList.remove('active-Btn')
    }



}
// * show category stars 
const showCategory = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    const data = await res.json()

    removeActiveClass()

    const btnCategory = document.getElementById(`btn-${id}`)
    btnCategory.classList.add('active-Btn')

    document.getElementById('allDataContainer').classList.add('hidden')
    document.getElementById('spin').classList.remove('hidden')
    document.getElementById('spin').classList.add('flex')

    // ! spin
    setTimeout(() => {

        displayAllData(data.data.length ? data.data : Bird())
        document.getElementById('allDataContainer').classList.remove('hidden')
        document.getElementById('spin').classList.add('hidden')

    }, 2000)

}
// * show category ends


// ! No Content
const Bird = () => {

    document.getElementById('error').classList.add('flex')

    document.getElementById('error').classList.remove('hidden')
    document.getElementById('spin').classList.add('hidden')

    document.getElementById('titleBtn').addEventListener('click', () => {
        document.getElementById('error').classList.add('hidden')


    })


}

//! decending order sort........


const sort = () => {


    document.getElementById('sort').addEventListener('click', () => {
        document.getElementById('error').classList.add('hidden')


    })

    document.getElementById('allDataContainer').classList.add('hidden')
    document.getElementById('spin').classList.remove('hidden')
    document.getElementById('spin').classList.add('flex')



    setTimeout(async () => {
        document.getElementById('allDataContainer').classList.remove('hidden')
        document.getElementById('spin').classList.add('hidden')


        try {

            const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
            const data = await res.json();

            if (data.status && Array.isArray(data.pets)) {

                const sortedPets = data.pets.sort((a, b) => {

                    const priceA = a.price !== undefined && a.price !== null ? a.price : 0;
                    const priceB = b.price !== undefined && b.price !== null ? b.price : 0;
                    return priceB - priceA;
                    


                });


                displayAllData(sortedPets);
            } else {
                console.error('No pets found or status is not successful.');
            }

        } catch (error) {
            console.error('Error fetching the pets:', error);
        }

    }, 2000)

};


// !  navbar 
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


const CACHE_NAME = 'pwa-cache';
const urlsToCache = ['/', '/index.html', '/css/style.css', '/js/app.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
