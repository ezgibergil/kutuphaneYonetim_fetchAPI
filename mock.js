const apiUrl = 'https://jsonplaceholder.typicode.com/posts';  // JSON API URL'yi kendi mock API'nizle değiştirebilirsiniz
const bookList = document.getElementById('bookList');
const addButton = document.getElementById('addBook');
const title = document.getElementById('bookTitle');

// Sayfa yüklendiğinde kitapları listele
document.addEventListener('DOMContentLoaded', () => {
    getBooks();
});

// Kitapları API'den çekme
async function getBooks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error:', error);
        bookList.innerHTML = "<h1 class='error-message'>Hata oluştu!</h1>";
    }
}

// Kitapları ekranda listeleme
function displayBooks(books) {
    bookList.innerHTML = ''; // Listeyi temizle
    if (books.length === 0) {
        bookList.innerHTML = "<p>Hiç kitap bulunamadı.</p>";
        return;
    }

    books.forEach(b => {
        const bookItem = document.createElement('div');
        bookItem.className = "book-item";

        const bookTitle = document.createElement("span");
        bookTitle.textContent = b.title;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Sil";
        deleteButton.addEventListener("click", () => {
            deleteBook(b.id);
        });

        bookItem.appendChild(bookTitle);
        bookItem.appendChild(deleteButton);
        bookList.appendChild(bookItem);
    });
}

// Kitap ekleme
addButton.addEventListener("click", async () => {
    const bookTitleValue = title.value.trim(); // Giriş değerini al
    if (bookTitleValue === '') {
        alert("Kitap adı girin!");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: bookTitleValue })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newBook = await response.json();
        alert("Kitap başarıyla eklendi!");
        title.value = "";  // Inputu temizle
        getBooks();  // Kitapları tekrar getir
    } catch (error) {
        console.error('Error:', error);
        alert("Bir hata oluştu!");
    }
});

// Kitap silme
async function deleteBook(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Kitap başarıyla silindi!");
        getBooks();  // Kitapları tekrar getir
    } catch (error) {
        console.error('Error:', error);
        alert("Bir hata oluştu!");
    }
}
