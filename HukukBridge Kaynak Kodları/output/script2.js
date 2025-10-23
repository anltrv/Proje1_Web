// Global Variables
        let currentUser = null;
        
        // İl-İlçe Veritabanı
        const cityDistricts = {
            'İstanbul': ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'],
            'Ankara': ['Akyurt', 'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kalecik', 'Kazan', 'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle'],
            'İzmir': ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla'],
            'Bursa': ['Büyükorhan', 'Gemlik', 'Gürsu', 'Harmancık', 'İnegöl', 'İznik', 'Karacabey', 'Keles', 'Kestel', 'Mudanya', 'Mustafakemalpaşa', 'Nilüfer', 'Orhaneli', 'Orhangazi', 'Osmangazi', 'Yenişehir', 'Yıldırım'],
            'Antalya': ['Akseki', 'Aksu', 'Alanya', 'Demre', 'Döşemealtı', 'Elmalı', 'Finike', 'Gazipaşa', 'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer', 'Kepez', 'Konyaaltı', 'Korkuteli', 'Kumluca', 'Manavgat', 'Muratpaşa', 'Serik'],
            'Adana': ['Aladağ', 'Ceyhan', 'Çukurova', 'Feke', 'İmamoğlu', 'Karaisalı', 'Karataş', 'Kozan', 'Pozantı', 'Saimbeyli', 'Sarıçam', 'Seyhan', 'Tufanbeyli', 'Yumurtalık', 'Yüreğir'],
            'Konya': ['Ahırlı', 'Akören', 'Akşehir', 'Altınekin', 'Beyşehir', 'Bozkır', 'Cihanbeyli', 'Çeltik', 'Çumra', 'Derbent', 'Derebucak', 'Doğanhisar', 'Emirgazi', 'Ereğli', 'Güneysınır', 'Hadim', 'Halkapınar', 'Hüyük', 'Ilgın', 'Kadınhanı', 'Karapınar', 'Karatay', 'Kulu', 'Meram', 'Sarayönü', 'Selçuklu', 'Seydişehir', 'Taşkent', 'Tuzlukçu', 'Yalıhüyük', 'Yunak'],
            'Gaziantep': ['Araban', 'İslahiye', 'Karkamış', 'Nizip', 'Nurdağı', 'Oğuzeli', 'Şahinbey', 'Şehitkamil', 'Yavuzeli'],
            'Kayseri': ['Akkışla', 'Bünyan', 'Develi', 'Felahiye', 'Hacılar', 'İncesu', 'Kocasinan', 'Melikgazi', 'Özvatan', 'Pınarbaşı', 'Sarıoğlan', 'Sarız', 'Talas', 'Tomarza', 'Yahyalı', 'Yeşilhisar'],
            'Mersin': ['Akdeniz', 'Anamur', 'Aydıncık', 'Bozyazı', 'Çamlıyayla', 'Erdemli', 'Gülnar', 'Mezitli', 'Mut', 'Silifke', 'Tarsus', 'Toroslar', 'Yenişehir'],
            'Eskişehir': ['Alpu', 'Beylikova', 'Çifteler', 'Günyüzü', 'Han', 'İnönü', 'Mahmudiye', 'Mihalgazi', 'Mihalıççık', 'Odunpazarı', 'Sarıcakaya', 'Seyitgazi', 'Sivrihisar', 'Tepebaşı'],
            'Kocaeli': ['Başiskele', 'Çayırova', 'Darıca', 'Derince', 'Dilovası', 'Gebze', 'Gölcük', 'İzmit', 'Kandıra', 'Karamürsel', 'Kartepe', 'Körfez'],
            'Manisa': ['Ahmetli', 'Akhisar', 'Alaşehir', 'Demirci', 'Gölmarmara', 'Gördes', 'Kırkağaç', 'Köprübaşı', 'Kula', 'Salihli', 'Sarıgöl', 'Saruhanlı', 'Selendi', 'Soma', 'Şehzadeler', 'Turgutlu', 'Yunusemre'],
            'Aydın': ['Bozdoğan', 'Buharkent', 'Çine', 'Didim', 'Efeler', 'Germencik', 'İncirliova', 'Karacasu', 'Karpuzlu', 'Koçarlı', 'Köşk', 'Kuşadası', 'Kuyucak', 'Nazilli', 'Söke', 'Sultanhisar', 'Yenipazar']
        };
        
        let lawyers = [
            {
                id: 1,
                name: 'Mehmet Yılmaz',
                sicil: '12345',
                specialties: ['aile', 'is'],
                cities: ['İstanbul', 'Kocaeli'],
                districts: ['Kadıköy', 'Beşiktaş', 'Şişli', 'İzmit', 'Gebze'],
                casePrices: {
                    'aile': {
                        'Boşanma Davası': 15000,
                        'Velayet Davası': 12000,
                        'Nafaka Davası': 8000,
                        'Mal Paylaşımı': 18000,
                        'Evlilik İptali': 10000
                    },
                    'is': {
                        'İşten Çıkarma': 8000,
                        'Mobbing Davası': 12000,
                        'Fazla Mesai Alacağı': 6000,
                        'Kıdem Tazminatı': 7000,
                        'İş Kazası': 15000
                    }
                },
                email: 'mehmet.yilmaz@email.com',
                phone: '0532 123 45 67',
                about: '15 yıllık deneyimle aile ve iş hukuku alanında hizmet vermekteyim.'
            },
            {
                id: 2,
                name: 'Ayşe Demir',
                sicil: '67890',
                specialties: ['ceza', 'ticaret'],
                cities: ['Ankara', 'Eskişehir'],
                districts: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Odunpazarı', 'Tepebaşı'],
                casePrices: {
                    'ceza': {
                        'Hırsızlık Davası': 20000,
                        'Dolandırıcılık': 25000,
                        'Yaralama Davası': 15000,
                        'Hakaret Davası': 8000,
                        'Uyuşturucu Davası': 30000
                    },
                    'ticaret': {
                        'Şirket Kuruluşu': 12000,
                        'Sözleşme İhlali': 18000,
                        'Alacak Davası': 10000,
                        'Ortaklık Anlaşmazlığı': 22000,
                        'Marka Tescili': 8000
                    }
                },
                email: 'ayse.demir@email.com',
                phone: '0533 987 65 43',
                about: 'Ceza ve ticaret hukuku alanında 12 yıllık deneyimim bulunmaktadır.'
            },
            {
                id: 3,
                name: 'Ali Kaya',
                sicil: '54321',
                specialties: ['gayrimenkul'],
                cities: ['İzmir', 'Manisa', 'Aydın'],
                districts: ['Konak', 'Karşıyaka', 'Bornova', 'Yunusemre', 'Şehzadeler', 'Efeler'],
                casePrices: {
                    'gayrimenkul': {
                        'Tapu İptali': 15000,
                        'Kiracı Çıkarma': 8000,
                        'İmar Sorunu': 12000,
                        'Emlak Alım-Satım': 6000,
                        'Kamulaştırma': 20000
                    }
                },
                email: 'ali.kaya@email.com',
                phone: '0534 555 44 33',
                about: 'Gayrimenkul hukuku konusunda uzmanlaşmış 10 yıllık tecrübeli avukatım.'
            }
        ];

        let notifications = [];
        let lawyerNotifications = [];
        let currentChat = null;
        let chatMessages = [];
        let clientChats = []; // Store client's active chats

        // İl-İlçe Functions
        function updateDistricts(citySelectId, districtSelectId) {
            const citySelect = document.getElementById(citySelectId);
            const districtSelect = document.getElementById(districtSelectId);
            const selectedCity = citySelect.value;
            
            // Clear district options
            districtSelect.innerHTML = '<option value="">Tüm İlçeler</option>';
            
            if (selectedCity && cityDistricts[selectedCity]) {
                // Enable district select
                districtSelect.disabled = false;
                
                // Add districts for selected city
                cityDistricts[selectedCity].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                // Disable district select if no city selected
                districtSelect.disabled = true;
                districtSelect.innerHTML = '<option value="">Önce il seçin</option>';
            }
        }

        // Navigation and Section Management
        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.add('hidden'));
            
            // Show selected section
            document.getElementById(sectionName + '-section').classList.remove('hidden');
        }

        // Client Authentication Functions
        function showClientLogin() {
            document.getElementById('client-login-form').classList.remove('hidden');
            document.getElementById('client-register-form').classList.add('hidden');
        }

        function showClientRegister() {
            document.getElementById('client-login-form').classList.add('hidden');
            document.getElementById('client-register-form').classList.remove('hidden');
        }

        function handleClientLogin(event) {
            event.preventDefault();
            const tc = document.getElementById('client-login-tc').value;
            const password = document.getElementById('client-login-password').value;
            
            if (tc.length !== 11) {
                alert('TC Kimlik numarası 11 haneli olmalıdır.');
                return;
            }
            
            // Get stored client data
            const storedData = localStorage.getItem('clientData');
            let clientData = { name: 'Müvekkil', phone: 'Bilgi yok' };
            
            if (storedData) {
                const parsed = JSON.parse(storedData);
                if (parsed.tc === tc) {
                    clientData = parsed;
                }
            }
            
            // Simulate login process
            currentUser = { 
                type: 'client', 
                tc: tc, 
                name: clientData.name + ' ' + (clientData.surname || ''),
                phone: clientData.phone || 'Bilgi yok'
            };
            document.getElementById('client-name').textContent = `Hoş geldiniz, ${currentUser.name}`;
            
            // Load client's stored chats and notifications
            const storedChats = localStorage.getItem(`chats_${tc}`);
            if (storedChats) {
                clientChats = JSON.parse(storedChats);
            }
            
            const storedNotifications = localStorage.getItem(`notifications_${tc}`);
            if (storedNotifications) {
                notifications = JSON.parse(storedNotifications);
            }
            
            showSection('client-dashboard');
            loadLawyers();
            loadClientChats();
            updateNotificationBadge();
        }

        function handleClientRegister(event) {
            event.preventDefault();
            const tc = document.getElementById('client-register-tc').value;
            const name = document.getElementById('client-register-name').value;
            const surname = document.getElementById('client-register-surname').value;
            const birth = document.getElementById('client-register-birth').value;
            const phone = document.getElementById('client-register-phone').value;
            const password = document.getElementById('client-register-password').value;
            const passwordConfirm = document.getElementById('client-register-password-confirm').value;
            
            if (tc.length !== 11) {
                alert('TC Kimlik numarası 11 haneli olmalıdır.');
                return;
            }
            
            if (password !== passwordConfirm) {
                alert('Şifreler eşleşmiyor.');
                return;
            }
            
            if (password.length < 6) {
                alert('Şifre en az 6 karakter olmalıdır.');
                return;
            }
            
            // Store client data for later use
            localStorage.setItem('clientData', JSON.stringify({
                tc: tc,
                name: name,
                surname: surname,
                phone: phone,
                birth: birth
            }));
            
            // Simulate registration process
            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            showClientLogin();
        }

        // Lawyer Authentication Functions
        function showLawyerLogin() {
            document.getElementById('lawyer-login-form').classList.remove('hidden');
            document.getElementById('lawyer-register-form').classList.add('hidden');
        }

        function showLawyerRegister() {
            document.getElementById('lawyer-login-form').classList.add('hidden');
            document.getElementById('lawyer-register-form').classList.remove('hidden');
        }

        function handleLawyerLogin(event) {
            event.preventDefault();
            const sicil = document.getElementById('lawyer-login-sicil').value;
            const password = document.getElementById('lawyer-login-password').value;
            
            // Find lawyer by sicil
            const lawyer = lawyers.find(l => l.sicil === sicil);
            if (lawyer) {
                currentUser = { type: 'lawyer', ...lawyer };
                document.getElementById('lawyer-name').textContent = `Hoş geldiniz, Av. ${lawyer.name}`;
                showSection('lawyer-dashboard');
                loadLawyerProfile();
                loadLawyerNotifications();
            } else {
                alert('Sicil numarası bulunamadı.');
            }
        }

        function handleLawyerRegister(event) {
            event.preventDefault();
            const sicil = document.getElementById('lawyer-register-sicil').value;
            const name = document.getElementById('lawyer-register-name').value;
            const surname = document.getElementById('lawyer-register-surname').value;
            const password = document.getElementById('lawyer-register-password').value;
            const passwordConfirm = document.getElementById('lawyer-register-password-confirm').value;
            
            if (password !== passwordConfirm) {
                alert('Şifreler eşleşmiyor.');
                return;
            }
            
            if (password.length < 6) {
                alert('Şifre en az 6 karakter olmalıdır.');
                return;
            }
            
            // Simulate registration process
            alert('Kayıt başarılı! TBB sicil doğrulaması yapıldıktan sonra giriş yapabilirsiniz.');
            showLawyerLogin();
        }

        // Client Dashboard Functions
        function loadLawyers() {
            const resultsContainer = document.getElementById('lawyers-results');
            resultsContainer.innerHTML = '';
            
            lawyers.forEach(lawyer => {
                const lawyerCard = createLawyerCard(lawyer, '', '');
                resultsContainer.appendChild(lawyerCard);
            });
        }

        function createLawyerCard(lawyer, selectedCaseType, selectedSpecificCase) {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow';
            
            const specialtyNames = {
                'aile': 'Aile Hukuku',
                'is': 'İş Hukuku',
                'ceza': 'Ceza Hukuku',
                'ticaret': 'Ticaret Hukuku',
                'gayrimenkul': 'Gayrimenkul Hukuku'
            };
            
            // Dava fiyatlarını göster
            let priceInfo = '';
            if (selectedCaseType && selectedSpecificCase && lawyer.casePrices[selectedCaseType] && lawyer.casePrices[selectedCaseType][selectedSpecificCase]) {
                const price = lawyer.casePrices[selectedCaseType][selectedSpecificCase];
                priceInfo = `<p class="text-sm"><span class="font-medium">${selectedSpecificCase} Ücreti:</span> <span class="text-green-600 font-semibold">${price.toLocaleString()} TL</span></p>`;
            } else if (selectedCaseType && lawyer.casePrices[selectedCaseType]) {
                // Seçilen dava türündeki tüm fiyatları göster
                const cases = lawyer.casePrices[selectedCaseType];
                const caseList = Object.entries(cases).map(([caseName, price]) => 
                    `<div class="flex justify-between items-center py-1">
                        <span class="text-xs">${caseName}:</span>
                        <span class="text-xs font-semibold text-green-600">${price.toLocaleString()} TL</span>
                    </div>`
                ).join('');
                priceInfo = `<div class="text-sm">
                    <span class="font-medium">${specialtyNames[selectedCaseType]} Dava Ücretleri:</span>
                    <div class="mt-2 bg-gray-50 p-2 rounded text-xs">${caseList}</div>
                </div>`;
            } else {
                // Tüm uzmanlık alanlarındaki dava türlerini göster
                const allCases = [];
                lawyer.specialties.forEach(specialty => {
                    if (lawyer.casePrices[specialty]) {
                        Object.entries(lawyer.casePrices[specialty]).forEach(([caseName, price]) => {
                            allCases.push(`${caseName}: ${price.toLocaleString()} TL`);
                        });
                    }
                });
                priceInfo = `<div class="text-sm">
                    <span class="font-medium">Dava Ücretleri:</span>
                    <div class="mt-2 bg-gray-50 p-2 rounded text-xs max-h-24 overflow-y-auto">
                        ${allCases.map(caseInfo => `<div>${caseInfo}</div>`).join('')}
                    </div>
                </div>`;
            }
            
            card.innerHTML = `
                <div class="flex items-center mb-4">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👨‍💼</div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900">Av. ${lawyer.name}</h3>
                        <p class="text-sm text-gray-600">TBB Sicil: ${lawyer.sicil}</p>
                    </div>
                </div>
                <div class="space-y-2 mb-4">
                    <p class="text-sm"><span class="font-medium">Uzmanlık:</span> ${lawyer.specialties.map(s => specialtyNames[s]).join(', ')}</p>
                    <p class="text-sm"><span class="font-medium">Çalıştığı İller:</span> ${lawyer.cities.join(', ')}</p>
                    ${priceInfo}
                    ${lawyer.about ? `<p class="text-sm text-gray-600 mt-2">${lawyer.about}</p>` : ''}
                </div>
                <button onclick="contactLawyer(${lawyer.id})" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">İletişime Geç</button>
            `;
            
            return card;
        }

        function updateCaseOptions() {
            const caseTypeSelect = document.getElementById('case-type-filter');
            const specificCaseSelect = document.getElementById('specific-case-filter');
            const selectedCaseType = caseTypeSelect.value;
            
            // Clear specific case options
            specificCaseSelect.innerHTML = '<option value="">Tüm Davalar</option>';
            
            if (selectedCaseType) {
                specificCaseSelect.disabled = false;
                
                // Dava türüne göre spesifik davaları ekle
                const caseOptions = {
                    'aile': ['Boşanma Davası', 'Velayet Davası', 'Nafaka Davası', 'Mal Paylaşımı', 'Evlilik İptali'],
                    'is': ['İşten Çıkarma', 'Mobbing Davası', 'Fazla Mesai Alacağı', 'Kıdem Tazminatı', 'İş Kazası'],
                    'ceza': ['Hırsızlık Davası', 'Dolandırıcılık', 'Yaralama Davası', 'Hakaret Davası', 'Uyuşturucu Davası'],
                    'ticaret': ['Şirket Kuruluşu', 'Sözleşme İhlali', 'Alacak Davası', 'Ortaklık Anlaşmazlığı', 'Marka Tescili'],
                    'gayrimenkul': ['Tapu İptali', 'Kiracı Çıkarma', 'İmar Sorunu', 'Emlak Alım-Satım', 'Kamulaştırma']
                };
                
                if (caseOptions[selectedCaseType]) {
                    caseOptions[selectedCaseType].forEach(caseOption => {
                        const option = document.createElement('option');
                        option.value = caseOption;
                        option.textContent = caseOption;
                        specificCaseSelect.appendChild(option);
                    });
                }
            } else {
                specificCaseSelect.disabled = true;
                specificCaseSelect.innerHTML = '<option value="">Önce dava türü seçin</option>';
            }
        }

        function filterLawyers() {
            const caseType = document.getElementById('case-type-filter').value;
            const specificCase = document.getElementById('specific-case-filter').value;
            const city = document.getElementById('city-filter').value;
            const district = document.getElementById('district-filter').value;
            
            const filteredLawyers = lawyers.filter(lawyer => {
                const matchesCase = !caseType || lawyer.specialties.includes(caseType);
                const matchesSpecificCase = !specificCase || (lawyer.casePrices[caseType] && lawyer.casePrices[caseType][specificCase]);
                const matchesCity = !city || lawyer.cities.includes(city);
                const matchesDistrict = !district || (lawyer.districts && lawyer.districts.includes(district));
                
                return matchesCase && matchesSpecificCase && matchesCity && matchesDistrict;
            });
            
            const resultsContainer = document.getElementById('lawyers-results');
            resultsContainer.innerHTML = '';
            
            if (filteredLawyers.length === 0) {
                resultsContainer.innerHTML = '<div class="col-span-full text-center text-gray-500 py-8">Arama kriterlerinize uygun avukat bulunamadı.</div>';
            } else {
                filteredLawyers.forEach(lawyer => {
                    const lawyerCard = createLawyerCard(lawyer, caseType, specificCase);
                    resultsContainer.appendChild(lawyerCard);
                });
            }
        }

        function contactLawyer(lawyerId) {
            const lawyer = lawyers.find(l => l.id === lawyerId);
            if (lawyer && currentUser) {
                const requestId = `request_${currentUser.tc}_${lawyerId}_${Date.now()}`;
                
                // Add notification to lawyer with request details
                const notification = {
                    id: Date.now(),
                    type: 'contact_request',
                    from: currentUser.name || 'Müvekkil',
                    message: `${currentUser.name || 'Bir müvekkil'} sizinle iletişime geçmek istiyor.`,
                    lawyerId: lawyerId,
                    timestamp: new Date().toLocaleString('tr-TR'),
                    contact: currentUser.phone || 'Bilgi yok',
                    requestId: requestId,
                    clientTc: currentUser.tc,
                    clientName: currentUser.name,
                    status: 'pending'
                };
                
                lawyerNotifications.push(notification);
                
                // Show success message to client
                alert(`Av. ${lawyer.name} ile iletişim talebiniz gönderildi. Avukat talebinizi kabul ettiğinde sohbet başlayacaktır.\n\nİletişim Bilgileri:\nE-posta: ${lawyer.email}\nTelefon: ${lawyer.phone}`);
                
                // Add notification to client
                notifications.push({
                    id: Date.now(),
                    message: `Av. ${lawyer.name} ile iletişim talebiniz gönderildi. Avukatın onayını bekliyorsunuz.`,
                    timestamp: new Date().toLocaleString('tr-TR')
                });
                
                updateNotificationBadge();
            }
        }

        // Client Chat Functions
        function loadClientChats() {
            const chatsContainer = document.getElementById('client-active-chats');
            
            // Load chats from localStorage for current client
            const storedChats = localStorage.getItem(`chats_${currentUser.tc}`);
            if (storedChats) {
                clientChats = JSON.parse(storedChats);
            }
            
            // Filter only active chats (where lawyer accepted the request)
            const activeChats = clientChats.filter(chat => chat.status === 'active');
            
            if (activeChats.length === 0) {
                chatsContainer.innerHTML = '<p class="text-gray-500 text-sm">Henüz aktif sohbetiniz bulunmuyor. Bir avukatla iletişime geçin ve avukatın onayını bekleyin.</p>';
                return;
            }
            
            chatsContainer.innerHTML = activeChats.map(chat => `
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            👨‍💼
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">Av. ${chat.lawyerName}</h4>
                            <p class="text-sm text-gray-600">${chat.lastMessage}</p>
                            <p class="text-xs text-gray-400">${chat.timestamp}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        ${chat.unreadCount > 0 ? `<span class="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${chat.unreadCount}</span>` : ''}
                        <button onclick="openClientChat('${chat.id}', '${chat.lawyerName}', ${chat.lawyerId})" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                            Sohbet Aç
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function openClientChat(chatId, lawyerName, lawyerId) {
            currentChat = {
                id: chatId,
                clientName: currentUser.name,
                lawyerName: lawyerName,
                lawyerId: lawyerId,
                messages: []
            };
            
            document.getElementById('chat-title').textContent = `Av. ${lawyerName} ile Sohbet`;
            document.getElementById('chat-modal').classList.remove('hidden');
            
            // Load existing messages for this chat
            loadChatMessages();
            
            // Mark chat as read
            const chat = clientChats.find(c => c.id === chatId);
            if (chat) {
                chat.unreadCount = 0;
                loadClientChats();
            }
        }

        // Lawyer Dashboard Functions
        function loadLawyerProfile() {
            if (currentUser && currentUser.type === 'lawyer') {
                document.getElementById('lawyer-profile-name').value = currentUser.name.split(' ')[0] || '';
                document.getElementById('lawyer-profile-surname').value = currentUser.name.split(' ').slice(1).join(' ') || '';
                document.getElementById('lawyer-email').value = currentUser.email || '';
                document.getElementById('lawyer-phone').value = currentUser.phone || '';
                document.getElementById('lawyer-about').value = currentUser.about || '';
                
                // Set specialties checkboxes
                const checkboxes = document.querySelectorAll('#lawyer-dashboard-section input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    cb.checked = currentUser.specialties && currentUser.specialties.includes(cb.value);
                });
                
                // Set cities
                const citySelect = document.getElementById('lawyer-cities');
                Array.from(citySelect.options).forEach(option => {
                    option.selected = currentUser.cities && currentUser.cities.includes(option.value);
                });
                
                // Load case prices
                loadCasePrices();
            }
        }
        
        function loadCasePrices() {
            const container = document.getElementById('case-prices-container');
            container.innerHTML = '';
            
            if (currentUser && currentUser.casePrices) {
                Object.entries(currentUser.casePrices).forEach(([specialty, cases]) => {
                    const specialtyNames = {
                        'aile': 'Aile Hukuku',
                        'is': 'İş Hukuku',
                        'ceza': 'Ceza Hukuku',
                        'ticaret': 'Ticaret Hukuku',
                        'gayrimenkul': 'Gayrimenkul Hukuku'
                    };
                    
                    const specialtyDiv = document.createElement('div');
                    specialtyDiv.className = 'border-b border-gray-100 pb-3 mb-3';
                    specialtyDiv.innerHTML = `
                        <h4 class="font-medium text-gray-900 mb-2">${specialtyNames[specialty]}</h4>
                        <div class="space-y-2">
                            ${Object.entries(cases).map(([caseName, price]) => `
                                <div class="flex items-center justify-between">
                                    <label class="text-sm text-gray-700">${caseName}:</label>
                                    <div class="flex items-center space-x-2">
                                        <input type="number" value="${price}" 
                                               class="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                               onchange="updateCasePrice('${specialty}', '${caseName}', this.value)">
                                        <span class="text-sm text-gray-500">TL</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    container.appendChild(specialtyDiv);
                });
            }
        }
        
        function updateCasePrice(specialty, caseName, newPrice) {
            if (currentUser && currentUser.casePrices && currentUser.casePrices[specialty]) {
                currentUser.casePrices[specialty][caseName] = parseInt(newPrice) || 0;
                
                // Update in lawyers array
                const lawyerIndex = lawyers.findIndex(l => l.id === currentUser.id);
                if (lawyerIndex !== -1) {
                    lawyers[lawyerIndex].casePrices[specialty][caseName] = parseInt(newPrice) || 0;
                }
            }
        }

        function updateLawyerProfile(event) {
            event.preventDefault();
            
            if (currentUser && currentUser.type === 'lawyer') {
                const name = document.getElementById('lawyer-profile-name').value;
                const surname = document.getElementById('lawyer-profile-surname').value;
                const email = document.getElementById('lawyer-email').value;
                const phone = document.getElementById('lawyer-phone').value;
                const about = document.getElementById('lawyer-about').value;
                
                // Get selected specialties
                const specialties = [];
                const checkboxes = document.querySelectorAll('#lawyer-dashboard-section input[type="checkbox"]:checked');
                checkboxes.forEach(cb => specialties.push(cb.value));
                
                // Get selected cities
                const cities = [];
                const citySelect = document.getElementById('lawyer-cities');
                Array.from(citySelect.selectedOptions).forEach(option => cities.push(option.value));
                
                // Update current user and lawyers array
                currentUser.name = `${name} ${surname}`;
                currentUser.email = email;
                currentUser.phone = phone;
                currentUser.about = about;
                currentUser.specialties = specialties;
                currentUser.cities = cities;
                
                // Update in lawyers array
                const lawyerIndex = lawyers.findIndex(l => l.id === currentUser.id);
                if (lawyerIndex !== -1) {
                    lawyers[lawyerIndex] = { ...currentUser };
                }
                
                alert('Profil bilgileriniz başarıyla güncellendi!');
            }
        }

        function loadLawyerNotifications() {
            const notificationsList = document.getElementById('lawyer-notifications-list');
            const lawyerNotifs = lawyerNotifications.filter(n => n.lawyerId === currentUser.id);
            
            if (lawyerNotifs.length === 0) {
                notificationsList.innerHTML = '<p class="text-gray-500 text-sm">Henüz bildiriminiz bulunmuyor.</p>';
            } else {
                notificationsList.innerHTML = lawyerNotifs.map(notification => {
                    if (notification.type === 'contact_request' && notification.status === 'pending') {
                        return `
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p class="text-sm font-medium text-blue-900">${notification.message}</p>
                                <p class="text-xs text-blue-600 mt-1">${notification.timestamp}</p>
                                <p class="text-xs text-gray-600 mt-1">Telefon: ${notification.contact}</p>
                                <div class="flex gap-2 mt-3">
                                    <button onclick="acceptContactRequest('${notification.id}')" class="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">Kabul Et</button>
                                    <button onclick="rejectContactRequest('${notification.id}')" class="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">Reddet</button>
                                </div>
                            </div>
                        `;
                    } else if (notification.type === 'contact_request' && notification.status === 'accepted') {
                        return `
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p class="text-sm font-medium text-green-900">${notification.message}</p>
                                <p class="text-xs text-green-600 mt-1">${notification.timestamp}</p>
                                <p class="text-xs text-gray-600 mt-1">Telefon: ${notification.contact}</p>
                                <p class="text-xs text-green-600 mt-1">✅ Kabul edildi - Sohbet aktif</p>
                                <button onclick="openLawyerChat('${notification.chatId}', '${notification.clientName}')" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">Sohbete Git</button>
                            </div>
                        `;
                    } else if (notification.type === 'contact_request' && notification.status === 'rejected') {
                        return `
                            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p class="text-sm font-medium text-red-900">${notification.message}</p>
                                <p class="text-xs text-red-600 mt-1">${notification.timestamp}</p>
                                <p class="text-xs text-gray-600 mt-1">Telefon: ${notification.contact}</p>
                                <p class="text-xs text-red-600 mt-1">❌ Reddedildi</p>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p class="text-sm font-medium text-blue-900">${notification.message}</p>
                                <p class="text-xs text-blue-600 mt-1">${notification.timestamp}</p>
                                <p class="text-xs text-gray-600 mt-1">Telefon: ${notification.contact}</p>
                            </div>
                        `;
                    }
                }).join('');
                
                // Update notification badge - only count pending requests
                const pendingNotifs = lawyerNotifs.filter(n => n.status === 'pending');
                const badge = document.getElementById('lawyer-notification-badge');
                if (pendingNotifs.length > 0) {
                    badge.textContent = pendingNotifs.length;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }
        }

        function showLawyerNotifications() {
            loadLawyerNotifications();
        }

        function acceptContactRequest(notificationId) {
            const notification = lawyerNotifications.find(n => n.id == notificationId);
            if (!notification) return;
            
            // Update notification status
            notification.status = 'accepted';
            
            // Create chat ID
            const chatId = `chat_${notification.clientTc}_${currentUser.id}`;
            notification.chatId = chatId;
            
            // Create chat entry for client
            const clientChat = {
                id: chatId,
                lawyerId: currentUser.id,
                lawyerName: currentUser.name,
                clientName: notification.clientName,
                lastMessage: 'Avukat iletişim talebinizi kabul etti. Sohbet başladı!',
                timestamp: new Date().toLocaleString('tr-TR'),
                unreadCount: 1,
                status: 'active'
            };
            
            // Store client chat
            const clientChatList = JSON.parse(localStorage.getItem(`chats_${notification.clientTc}`) || '[]');
            clientChatList.push(clientChat);
            localStorage.setItem(`chats_${notification.clientTc}`, JSON.stringify(clientChatList));
            
            // Add notification to client
            const clientNotifications = JSON.parse(localStorage.getItem(`notifications_${notification.clientTc}`) || '[]');
            clientNotifications.push({
                id: Date.now(),
                message: `Av. ${currentUser.name} iletişim talebinizi kabul etti! Artık sohbet edebilirsiniz.`,
                timestamp: new Date().toLocaleString('tr-TR'),
                chatId: chatId,
                lawyerName: currentUser.name,
                lawyerId: currentUser.id
            });
            localStorage.setItem(`notifications_${notification.clientTc}`, JSON.stringify(clientNotifications));
            
            // Refresh notifications
            loadLawyerNotifications();
            
            // Show success message
            alert(`${notification.clientName} ile sohbet başlatıldı! Artık mesajlaşabilirsiniz.`);
        }

        function rejectContactRequest(notificationId) {
            const notification = lawyerNotifications.find(n => n.id == notificationId);
            if (!notification) return;
            
            // Update notification status
            notification.status = 'rejected';
            
            // Add notification to client
            const clientNotifications = JSON.parse(localStorage.getItem(`notifications_${notification.clientTc}`) || '[]');
            clientNotifications.push({
                id: Date.now(),
                message: `Av. ${currentUser.name} iletişim talebinizi reddetti. Başka avukatlarla iletişime geçebilirsiniz.`,
                timestamp: new Date().toLocaleString('tr-TR')
            });
            localStorage.setItem(`notifications_${notification.clientTc}`, JSON.stringify(clientNotifications));
            
            // Refresh notifications
            loadLawyerNotifications();
            
            alert(`${notification.clientName} ile iletişim talebi reddedildi.`);
        }

        function openLawyerChat(chatId, clientName) {
            currentChat = {
                id: chatId,
                clientName: clientName,
                lawyerName: currentUser.name,
                messages: []
            };
            
            document.getElementById('chat-title').textContent = `${clientName} ile Sohbet`;
            document.getElementById('chat-modal').classList.remove('hidden');
            
            // Load existing messages for this chat
            loadChatMessages();
            
            // Add initial message if no messages exist
            if (currentChat.messages.length === 0) {
                currentChat.messages.push({
                    sender: 'system',
                    message: 'Sohbet başlatıldı. Müvekkilinizle güvenli bir şekilde iletişim kurabilirsiniz.',
                    timestamp: new Date().toLocaleString('tr-TR')
                });
                
                // Save initial message
                const chatKey = currentChat.id;
                localStorage.setItem(chatKey, JSON.stringify(currentChat.messages));
                
                displayChatMessages();
            }
        }

        // Notification Functions
        function showNotifications() {
            const modal = document.getElementById('notifications-modal');
            const notificationsList = document.getElementById('notifications-list');
            
            if (notifications.length === 0) {
                notificationsList.innerHTML = '<p class="text-gray-500 text-sm">Henüz bildiriminiz bulunmuyor.</p>';
            } else {
                notificationsList.innerHTML = notifications.map(notification => `
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p class="text-sm">${notification.message}</p>
                        <p class="text-xs text-gray-500 mt-1">${notification.timestamp}</p>
                        ${notification.chatId ? `<button onclick="openChatFromNotification('${notification.chatId}', '${notification.lawyerName}', ${notification.lawyerId})" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">Sohbete Git</button>` : ''}
                    </div>
                `).join('');
            }
            
            modal.classList.remove('hidden');
        }

        function openChatFromNotification(chatId, lawyerName, lawyerId) {
            closeNotifications();
            
            if (currentUser.type === 'client') {
                openClientChat(chatId, lawyerName, lawyerId);
            }
        }

        function closeNotifications() {
            document.getElementById('notifications-modal').classList.add('hidden');
        }

        function updateNotificationBadge() {
            const badge = document.getElementById('notification-badge');
            if (notifications.length > 0) {
                badge.textContent = notifications.length;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        function logout() {
            currentUser = null;
            notifications = [];
            showSection('home');
        }

        // Settings Functions
        function showClientSettings() {
            const modal = document.getElementById('client-settings-modal');
            
            // Load current client data
            if (currentUser) {
                const storedData = localStorage.getItem('clientData');
                if (storedData) {
                    const clientData = JSON.parse(storedData);
                    document.getElementById('client-settings-name').value = clientData.name || '';
                    document.getElementById('client-settings-surname').value = clientData.surname || '';
                    document.getElementById('client-settings-email').value = clientData.email || '';
                    document.getElementById('client-settings-phone').value = clientData.phone || '';
                    document.getElementById('client-settings-birth').value = clientData.birth || '';
                }
            }
            
            modal.classList.remove('hidden');
        }

        function closeClientSettings() {
            document.getElementById('client-settings-modal').classList.add('hidden');
        }

        function showLawyerSettings() {
            const modal = document.getElementById('lawyer-settings-modal');
            
            // Load current lawyer data
            if (currentUser && currentUser.type === 'lawyer') {
                const nameParts = currentUser.name.split(' ');
                document.getElementById('lawyer-settings-name').value = nameParts[0] || '';
                document.getElementById('lawyer-settings-surname').value = nameParts.slice(1).join(' ') || '';
                document.getElementById('lawyer-settings-email').value = currentUser.email || '';
                document.getElementById('lawyer-settings-phone').value = currentUser.phone || '';
                document.getElementById('lawyer-settings-about').value = currentUser.about || '';
                
                // Set specialties
                const checkboxes = document.querySelectorAll('.lawyer-specialty-checkbox');
                checkboxes.forEach(cb => {
                    cb.checked = currentUser.specialties && currentUser.specialties.includes(cb.value);
                });
                
                // Set cities
                const citySelect = document.getElementById('lawyer-settings-cities');
                Array.from(citySelect.options).forEach(option => {
                    option.selected = currentUser.cities && currentUser.cities.includes(option.value);
                });
            }
            
            modal.classList.remove('hidden');
        }

        function closeLawyerSettings() {
            document.getElementById('lawyer-settings-modal').classList.add('hidden');
        }

        function updateClientProfile(event) {
            event.preventDefault();
            
            const name = document.getElementById('client-settings-name').value;
            const surname = document.getElementById('client-settings-surname').value;
            const email = document.getElementById('client-settings-email').value;
            const phone = document.getElementById('client-settings-phone').value;
            const birth = document.getElementById('client-settings-birth').value;
            const currentPassword = document.getElementById('client-current-password').value;
            const newPassword = document.getElementById('client-new-password').value;
            const newPasswordConfirm = document.getElementById('client-new-password-confirm').value;
            
            // Validate password change if provided
            if (newPassword || newPasswordConfirm) {
                if (!currentPassword) {
                    alert('Şifre değiştirmek için mevcut şifrenizi girmelisiniz.');
                    return;
                }
                if (newPassword !== newPasswordConfirm) {
                    alert('Yeni şifreler eşleşmiyor.');
                    return;
                }
                if (newPassword.length < 6) {
                    alert('Yeni şifre en az 6 karakter olmalıdır.');
                    return;
                }
            }
            
            // Update stored client data
            const clientData = {
                tc: currentUser.tc,
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                birth: birth,
                emailVerified: false,
                phoneVerified: false
            };
            
            localStorage.setItem('clientData', JSON.stringify(clientData));
            
            // Update current user
            currentUser.name = `${name} ${surname}`;
            document.getElementById('client-name').textContent = `Hoş geldiniz, ${currentUser.name}`;
            
            alert('Profil bilgileriniz başarıyla güncellendi!');
            closeClientSettings();
        }

        function updateLawyerSettings(event) {
            event.preventDefault();
            
            const name = document.getElementById('lawyer-settings-name').value;
            const surname = document.getElementById('lawyer-settings-surname').value;
            const email = document.getElementById('lawyer-settings-email').value;
            const phone = document.getElementById('lawyer-settings-phone').value;
            const minPrice = parseInt(document.getElementById('lawyer-settings-min-price').value);
            const maxPrice = parseInt(document.getElementById('lawyer-settings-max-price').value);
            const about = document.getElementById('lawyer-settings-about').value;
            const currentPassword = document.getElementById('lawyer-current-password').value;
            const newPassword = document.getElementById('lawyer-new-password').value;
            const newPasswordConfirm = document.getElementById('lawyer-new-password-confirm').value;
            
            // Validate password change if provided
            if (newPassword || newPasswordConfirm) {
                if (!currentPassword) {
                    alert('Şifre değiştirmek için mevcut şifrenizi girmelisiniz.');
                    return;
                }
                if (newPassword !== newPasswordConfirm) {
                    alert('Yeni şifreler eşleşmiyor.');
                    return;
                }
                if (newPassword.length < 6) {
                    alert('Yeni şifre en az 6 karakter olmalıdır.');
                    return;
                }
            }
            
            // Get selected specialties
            const specialties = [];
            const checkboxes = document.querySelectorAll('.lawyer-specialty-checkbox:checked');
            checkboxes.forEach(cb => specialties.push(cb.value));
            
            // Get selected cities
            const cities = [];
            const citySelect = document.getElementById('lawyer-settings-cities');
            Array.from(citySelect.selectedOptions).forEach(option => cities.push(option.value));
            
            // Update current user
            currentUser.name = `${name} ${surname}`;
            currentUser.email = email;
            currentUser.phone = phone;
            currentUser.about = about;
            currentUser.specialties = specialties;
            currentUser.cities = cities;
            
            // Update in lawyers array
            const lawyerIndex = lawyers.findIndex(l => l.id === currentUser.id);
            if (lawyerIndex !== -1) {
                lawyers[lawyerIndex] = { ...currentUser };
            }
            
            document.getElementById('lawyer-name').textContent = `Hoş geldiniz, Av. ${name} ${surname}`;
            
            alert('Profil bilgileriniz başarıyla güncellendi!');
            closeLawyerSettings();
            
            // Refresh lawyers list if client is viewing
            if (document.getElementById('lawyers-results')) {
                loadLawyers();
            }
        }

        function verifyEmail() {
            const email = document.getElementById('client-settings-email').value;
            const statusDiv = document.getElementById('email-verification-status');
            
            if (!email) {
                alert('Lütfen e-posta adresinizi girin.');
                return;
            }
            
            // Simulate email verification process
            statusDiv.innerHTML = '<span class="text-blue-600">📧 Doğrulama e-postası gönderiliyor...</span>';
            statusDiv.classList.remove('hidden');
            
            setTimeout(() => {
                statusDiv.innerHTML = '<span class="text-green-600">✅ Doğrulama e-postası gönderildi! E-posta kutunuzu kontrol edin.</span>';
                
                // Simulate verification after 3 seconds
                setTimeout(() => {
                    statusDiv.innerHTML = '<span class="text-green-600">✅ E-posta adresi doğrulandı!</span>';
                }, 3000);
            }, 1500);
        }

        function verifyPhone() {
            const phone = document.getElementById('client-settings-phone').value;
            const statusDiv = document.getElementById('phone-verification-status');
            
            if (!phone) {
                alert('Lütfen telefon numaranızı girin.');
                return;
            }
            
            // Simulate phone verification process
            statusDiv.innerHTML = '<span class="text-blue-600">📱 SMS doğrulama kodu gönderiliyor...</span>';
            statusDiv.classList.remove('hidden');
            
            setTimeout(() => {
                const verificationCode = Math.floor(100000 + Math.random() * 900000);
                statusDiv.innerHTML = `<span class="text-green-600">✅ SMS gönderildi! Doğrulama kodu: <strong>${verificationCode}</strong></span>`;
                
                // Simulate verification after 2 seconds
                setTimeout(() => {
                    statusDiv.innerHTML = '<span class="text-green-600">✅ Telefon numarası doğrulandı!</span>';
                }, 2000);
            }, 1500);
        }

        // Chat Functions

        function loadChatMessages() {
            const chatKey = currentChat.id;
            const savedMessages = localStorage.getItem(chatKey);
            if (savedMessages) {
                currentChat.messages = JSON.parse(savedMessages);
            }
            displayChatMessages();
        }

        function displayChatMessages() {
            const messagesContainer = document.getElementById('chat-messages');
            messagesContainer.innerHTML = '';
            
            currentChat.messages.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `mb-3 ${msg.sender === currentUser.name ? 'text-right' : 'text-left'}`;
                
                if (msg.sender === 'system') {
                    messageDiv.innerHTML = `
                        <div class="bg-gray-100 text-gray-600 text-xs p-2 rounded-lg inline-block">
                            ${msg.message}
                        </div>
                    `;
                } else {
                    const isCurrentUser = msg.sender === currentUser.name;
                    messageDiv.innerHTML = `
                        <div class="max-w-xs ${isCurrentUser ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-gray-200 text-gray-800'} p-3 rounded-lg">
                            <p class="text-sm">${msg.message}</p>
                            <p class="text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'} mt-1">${msg.timestamp}</p>
                        </div>
                    `;
                }
                
                messagesContainer.appendChild(messageDiv);
            });
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function sendMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            
            if (!message || !currentChat) return;
            
            const newMessage = {
                sender: currentUser.name,
                message: message,
                timestamp: new Date().toLocaleString('tr-TR')
            };
            
            currentChat.messages.push(newMessage);
            
            // Save to localStorage
            const chatKey = currentChat.id;
            localStorage.setItem(chatKey, JSON.stringify(currentChat.messages));
            
            // Update chat list for both parties
            updateChatList(message);
            
            // Clear input and display messages
            input.value = '';
            displayChatMessages();
        }

        function updateChatList(lastMessage) {
            if (currentUser.type === 'client') {
                // Update client's chat list
                const chat = clientChats.find(c => c.id === currentChat.id);
                if (chat) {
                    chat.lastMessage = lastMessage;
                    chat.timestamp = new Date().toLocaleString('tr-TR');
                    chat.status = 'active';
                }
            } else if (currentUser.type === 'lawyer' && currentChat.clientTc) {
                // Create notification for client about new message
                const clientNotification = {
                    id: Date.now(),
                    message: `Av. ${currentUser.name} size mesaj gönderdi: "${lastMessage.substring(0, 50)}${lastMessage.length > 50 ? '...' : ''}"`,
                    timestamp: new Date().toLocaleString('tr-TR'),
                    chatId: currentChat.id,
                    lawyerName: currentUser.name,
                    lawyerId: currentUser.id
                };
                
                // Store notification for client (in real app, this would be sent to client)
                const clientNotifications = JSON.parse(localStorage.getItem(`notifications_${currentChat.clientTc}`) || '[]');
                clientNotifications.push(clientNotification);
                localStorage.setItem(`notifications_${currentChat.clientTc}`, JSON.stringify(clientNotifications));
                
                // Update client's chat list
                const clientChatList = JSON.parse(localStorage.getItem(`chats_${currentChat.clientTc}`) || '[]');
                let clientChat = clientChatList.find(c => c.id === currentChat.id);
                if (!clientChat) {
                    clientChat = {
                        id: currentChat.id,
                        lawyerId: currentUser.id,
                        lawyerName: currentUser.name,
                        clientName: currentChat.clientName,
                        lastMessage: lastMessage,
                        timestamp: new Date().toLocaleString('tr-TR'),
                        unreadCount: 1,
                        status: 'active'
                    };
                    clientChatList.push(clientChat);
                } else {
                    clientChat.lastMessage = lastMessage;
                    clientChat.timestamp = new Date().toLocaleString('tr-TR');
                    clientChat.unreadCount = (clientChat.unreadCount || 0) + 1;
                    clientChat.status = 'active';
                }
                localStorage.setItem(`chats_${currentChat.clientTc}`, JSON.stringify(clientChatList));
            }
        }



        function handleChatKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function closeChat() {
            document.getElementById('chat-modal').classList.add('hidden');
            currentChat = null;
        }

        // FAQ Functions
        function showFAQ(type) {
            const modal = document.getElementById('faq-modal');
            const title = document.getElementById('faq-title');
            const content = document.getElementById('faq-content');
            
            const faqData = {
                'registration': {
                    title: 'Nasıl Kayıt Olabilirim?',
                    content: `
                        <h4>Müvekkil Kaydı:</h4>
                        <ul>
                            <li>Ana sayfada "Müvekkil Girişi" butonuna tıklayın</li>
                            <li>"Kayıt Ol" seçeneğini seçin</li>
                            <li>TC kimlik numaranızı, kişisel bilgilerinizi girin</li>
                            <li>Güvenli bir şifre belirleyin</li>
                            <li>Kayıt işlemini tamamlayın</li>
                        </ul>
                        
                        <h4>Avukat Kaydı:</h4>
                        <ul>
                            <li>Ana sayfada "Avukat Girişi" butonuna tıklayın</li>
                            <li>"Kayıt Ol" seçeneğini seçin</li>
                            <li>TBB sicil numaranızı girin</li>
                            <li>Kişisel ve mesleki bilgilerinizi doldurun</li>
                            <li>TBB doğrulaması sonrası hesabınız aktif olur</li>
                        </ul>
                    `
                },
                'lawyer-verification': {
                    title: 'Avukatlar Nasıl Doğrulanıyor?',
                    content: `
                        <p>Platformumuzdaki tüm avukatlar aşağıdaki doğrulama süreçlerinden geçer:</p>
                        <ul>
                            <li><strong>TBB Sicil Doğrulaması:</strong> Türkiye Barolar Birliği sicil numarası kontrol edilir</li>
                            <li><strong>Kimlik Doğrulaması:</strong> Avukatın kimlik bilgileri TBB kayıtlarıyla eşleştirilir</li>
                            <li><strong>Lisans Kontrolü:</strong> Avukatlık ruhsatının geçerliliği kontrol edilir</li>
                            <li><strong>Disiplin Kaydı:</strong> Disiplin cezası geçmişi incelenir</li>
                            <li><strong>İletişim Doğrulaması:</strong> Telefon ve e-posta adresi doğrulanır</li>
                        </ul>
                        <p>Sadece tüm kontrolleri geçen avukatlar platformda hizmet verebilir.</p>
                    `
                },
                'pricing': {
                    title: 'Ücretlendirme Nasıl Çalışır?',
                    content: `
                        <h4>Platform Ücreti:</h4>
                        <ul>
                            <li>HukukBridge kullanımı müvekkiller için tamamen ücretsizdir</li>
                            <li>Avukatlardan sadece başarılı eşleşme sonrası komisyon alınır</li>
                        </ul>
                        
                        <h4>Avukat Ücretleri:</h4>
                        <ul>
                            <li>Her avukat kendi dava ücretlerini belirler</li>
                            <li>Ücretler dava türü ve karmaşıklığına göre değişir</li>
                            <li>Ödeme koşulları doğrudan avukatla görüşülür</li>
                            <li>Platform üzerinden ödeme yapılmaz</li>
                        </ul>
                        
                        <h4>Şeffaflık:</h4>
                        <ul>
                            <li>Tüm ücretler önceden belirtilir</li>
                            <li>Gizli maliyet yoktur</li>
                            <li>Ücret pazarlığı avukatla yapılabilir</li>
                        </ul>
                    `
                },
                'security': {
                    title: 'Verilerim Güvende Mi?',
                    content: `
                        <h4>Veri Güvenliği:</h4>
                        <ul>
                            <li>Tüm veriler SSL şifreleme ile korunur</li>
                            <li>Kişisel bilgiler sadece eşleşen avukatla paylaşılır</li>
                            <li>TC kimlik numaraları şifrelenerek saklanır</li>
                            <li>Düzenli güvenlik denetimleri yapılır</li>
                        </ul>
                        
                        <h4>Gizlilik:</h4>
                        <ul>
                            <li>Avukat-müvekkil gizliliği korunur</li>
                            <li>Dava bilgileri üçüncü kişilerle paylaşılmaz</li>
                            <li>Sohbet geçmişi güvenli sunucularda saklanır</li>
                            <li>KVKK uyumlu veri işleme</li>
                        </ul>
                        
                        <h4>Hesap Güvenliği:</h4>
                        <ul>
                            <li>Güçlü şifre zorunluluğu</li>
                            <li>İki faktörlü doğrulama seçeneği</li>
                            <li>Şüpheli aktivite bildirimleri</li>
                        </ul>
                    `
                },
                'communication': {
                    title: 'Avukatla Nasıl İletişim Kurarım?',
                    content: `
                        <h4>İletişim Süreci:</h4>
                        <ol>
                            <li><strong>Avukat Seçimi:</strong> Filtreleri kullanarak uygun avukatı bulun</li>
                            <li><strong>İletişim Talebi:</strong> "İletişime Geç" butonuna tıklayın</li>
                            <li><strong>Avukat Onayı:</strong> Avukatın talebinizi kabul etmesini bekleyin</li>
                            <li><strong>Sohbet Başlatma:</strong> Onay sonrası güvenli sohbet başlar</li>
                        </ol>
                        
                        <h4>İletişim Kanalları:</h4>
                        <ul>
                            <li><strong>Platform Sohbeti:</strong> Güvenli mesajlaşma sistemi</li>
                            <li><strong>Telefon:</strong> Avukatın paylaştığı telefon numarası</li>
                            <li><strong>E-posta:</strong> Doğrudan e-posta iletişimi</li>
                            <li><strong>Yüz Yüze:</strong> Randevu alarak ofis ziyareti</li>
                        </ul>
                        
                        <h4>İletişim Kuralları:</h4>
                        <ul>
                            <li>Saygılı ve profesyonel dil kullanın</li>
                            <li>Dava detaylarını açık şekilde anlatın</li>
                            <li>Beklentilerinizi net olarak belirtin</li>
                            <li>Avukatın çalışma saatlerine uyun</li>
                        </ul>
                    `
                }
            };
            
            const faq = faqData[type];
            if (faq) {
                title.textContent = faq.title;
                content.innerHTML = faq.content;
                modal.classList.remove('hidden');
            }
        }

        function closeFAQ() {
            document.getElementById('faq-modal').classList.add('hidden');
        }

        // Contact Form Function
        function sendContactMessage(event) {
            event.preventDefault();
            
            const form = event.target;
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simulate sending message
            alert(`Mesajınız başarıyla gönderildi!\n\nAd: ${name}\nE-posta: ${email}\n\nEn kısa sürede size dönüş yapacağız.`);
            
            // Reset form
            form.reset();
        }

        // Registration Modal Functions
        function showRegistrationModal() {
            document.getElementById('registration-modal').classList.remove('hidden');
        }

        function closeRegistrationModal() {
            document.getElementById('registration-modal').classList.add('hidden');
        }

        function selectClientRegistration() {
            closeRegistrationModal();
            showSection('client-auth');
            showClientRegister();
        }

        function selectLawyerRegistration() {
            closeRegistrationModal();
            showSection('lawyer-auth');
            showLawyerRegister();
        }

        // TC Kimlik validation
        document.addEventListener('DOMContentLoaded', function() {
            const tcInputs = document.querySelectorAll('input[id*="tc"]');
            tcInputs.forEach(input => {
                input.addEventListener('input', function(e) {
                    e.target.value = e.target.value.replace(/\D/g, '');
                });
            });
        });