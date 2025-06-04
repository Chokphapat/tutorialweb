const tutorialSteps = [
            {
                target: '.logo',
                message: 'นี่คือชื่อเว็บไซต์ของคุณ',
                position: 'bottom'
            },
            {
                target: '#nav-home',
                message: 'นี่คือลิงก์ไปหน้าแรก',
                position: 'bottom'
            },
            {
                target: '#nav-about',
                message: 'นี่คือลิงก์ไปหน้าข้อมูลเกี่ยวกับเรา',
                position: 'bottom'
            },
            {
                target: '#nav-services',
                message: 'นี่คือลิงก์ไปหน้าบริการต่าง ๆ',
                position: 'bottom'
            },
            {
                target: '#nav-contact',
                message: 'นี่คือลิงก์ไปหน้าติดต่อเรา',
                position: 'bottom'
            },
            {
                target: '#main-button',
                message: 'นี่คือปุ่มสำคัญในหน้าเว็บ',
                position: 'top'
            },
            {
                target: null,
                message: 'คุณพร้อมใช้งานเว็บไซต์ของเราแล้ว! คลิกเพื่อเริ่มต้น',
                position: 'center'
            }
        ];
        
        // สร้าง Tutorial Elements
        const overlay = document.createElement('div');
        overlay.className = 'tutorial-overlay';
        
        const highlightBox = document.createElement('div');
        highlightBox.className = 'highlight-box';
        
        const tutorialText = document.createElement('div');
        tutorialText.className = 'tutorial-text';
        
        document.body.appendChild(overlay);
        overlay.appendChild(highlightBox);
        overlay.appendChild(tutorialText);
        
        let currentStep = 0;
        
        // ฟังก์ชันแสดงขั้นตอนปัจจุบัน
        function showStep(stepIndex) {
            const step = tutorialSteps[stepIndex];
            
            if (step.target) {
                const targetElement = document.querySelector(step.target);
                const rect = targetElement.getBoundingClientRect();
                
                // ตั้งค่ากรอบไฮไลต์
                highlightBox.style.width = `${rect.width + 20}px`;
                highlightBox.style.height = `${rect.height + 20}px`;
                highlightBox.style.top = `${rect.top - 10}px`;
                highlightBox.style.left = `${rect.left - 10}px`;
                highlightBox.style.display = 'block';
                highlightBox.classList.add('pulse');
                
                // ตั้งค่าข้อความคำแนะนำ
                tutorialText.textContent = step.message;
                
                // กำหนดตำแหน่งข้อความ
                if (step.position === 'top') {
                    tutorialText.style.top = `${rect.top - tutorialText.offsetHeight - 20}px`;
                    tutorialText.style.left = `${rect.left + rect.width/2 - tutorialText.offsetWidth/2}px`;
                } else if (step.position === 'bottom') {
                    tutorialText.style.top = `${rect.bottom + 20}px`;
                    tutorialText.style.left = `${rect.left + rect.width/2 - tutorialText.offsetWidth/2}px`;
                } else {
                    tutorialText.style.top = '50%';
                    tutorialText.style.left = '50%';
                    tutorialText.style.transform = 'translate(-50%, -50%)';
                }
            } else {
                // ถ้าไม่มี target (ขั้นตอนสุดท้าย)
                highlightBox.style.display = 'none';
                tutorialText.textContent = step.message;
                tutorialText.style.top = '50%';
                tutorialText.style.left = '50%';
                tutorialText.style.transform = 'translate(-50%, -50%)';
                
                const button = document.createElement('button');
                button.textContent = 'เริ่มใช้งาน';
                button.onclick = finishTutorial;
                tutorialText.appendChild(button);
            }
        }
// ฟังก์ชันจบการสอน
        function finishTutorial() {
            overlay.style.display = 'none';
            
            // บันทึกว่าเคยแสดง Tutorial แล้ว (ใช้ localStorage)
            localStorage.setItem('tutorialCompleted', 'true');
        }
        
        // เริ่ม Tutorial เมื่อโหลดหน้าเว็บ (ถ้ายังไม่เคยแสดง)
        window.addEventListener('DOMContentLoaded', () => {
            if (!localStorage.getItem('tutorialCompleted')) {
                showStep(currentStep);
                
                // คลิกที่ไหนก็ได้เพื่อไปขั้นตอนถัดไป
                overlay.addEventListener('click', () => {
                    if (currentStep < tutorialSteps.length - 1) {
                        currentStep++;
                        showStep(currentStep);
                    }
                });
            } else {
                overlay.style.display = 'none';
            }
        });
