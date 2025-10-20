// Файл: js/chat/schedule-service.js

class ScheduleService {
    static BASE_URL = 'https://portal.novsu.ru';
    
    // Получить типы расписаний
    static async getScheduleTypes() {
        return [
            { name: 'Очная форма обучения', url: '/univer/timetable/ochn/' },
            { name: 'Заочная форма обучения', url: '/univer/timetable/zaochn/' },
            { name: 'Сессия', url: '/univer/timetable/session/' },
            { name: 'Колледжи', url: '/univer/timetable/spo/' }
        ];
    }
    
    // Анализировать конкретную страницу расписания
    static async analyzeSchedulePage(scheduleUrl) {
        try {
            const response = await fetch(`${this.BASE_URL}${scheduleUrl}`);
            const html = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Ищем формы выбора
            const forms = doc.querySelectorAll('form');
            const selects = doc.querySelectorAll('select');
            const tables = doc.querySelectorAll('table');
            
            const analysis = {
                forms: Array.from(forms).map(form => ({
                    action: form.action,
                    method: form.method,
                    inputs: Array.from(form.querySelectorAll('input, select, textarea')).map(input => ({
                        name: input.name,
                        type: input.type,
                        options: input.tagName === 'SELECT' ? 
                            Array.from(input.options).map(opt => ({ value: opt.value, text: opt.text })) : 
                            null
                    }))
                })),
                selects: Array.from(selects).map(select => ({
                    name: select.name,
                    options: Array.from(select.options).map(opt => ({ value: opt.value, text: opt.text }))
                })),
                tables: tables.length,
                structure: this.parseScheduleStructure(doc)
            };
            
            return analysis;
        } catch (error) {
            console.error('Error analyzing schedule page:', error);
            return null;
        }
    }
    
    static parseScheduleStructure(doc) {
        // Парсим возможную структуру данных расписания
        const structure = {
            faculties: [],
            groups: [],
            teachers: [],
            dates: []
        };
        
        // Ищем селекторы для выбора
        const facultySelect = doc.querySelector('select[name*="faculty"], select[id*="faculty"]');
        const groupSelect = doc.querySelector('select[name*="group"], select[id*="group"]');
        const teacherSelect = doc.querySelector('select[name*="teacher"], select[id*="teacher"]');
        
        if (facultySelect) {
            structure.faculties = Array.from(facultySelect.options)
                .filter(opt => opt.value)
                .map(opt => ({ value: opt.value, text: opt.text.trim() }));
        }
        
        if (groupSelect) {
            structure.groups = Array.from(groupSelect.options)
                .filter(opt => opt.value)
                .map(opt => ({ value: opt.value, text: opt.text.trim() }));
        }
        
        if (teacherSelect) {
            structure.teachers = Array.from(teacherSelect.options)
                .filter(opt => opt.value)
                .map(opt => ({ value: opt.value, text: opt.text.trim() }));
        }
        
        return structure;
    }
    
    // Получить расписание (основной метод)
static async getSchedule(options = {}) {
    try {
        const scheduleTypes = await this.getScheduleTypes();
        let schedule = null;
        
        for (const type of scheduleTypes) {
            schedule = await this.analyzeSchedulePage(type.url);
            if (schedule && schedule.structure.faculties.length > 0) {
                break;
            }
        }
        
        return schedule || this.getFallbackSchedule(options);
    } catch (error) {
        console.error('Error getting schedule:', error);
        return this.getFallbackSchedule(options);
    }
}ё
    
    static async submitScheduleForm(form, options) {
        // Создаем форму для отправки
        const formData = new FormData();
        
        // Добавляем параметры из options
        if (options.faculty) formData.append('faculty', options.faculty);
        if (options.group) formData.append('group', options.group);
        if (options.teacher) formData.append('teacher', options.teacher);
        if (options.date) formData.append('date', options.date);
        
        try {
            const response = await fetch(`${this.BASE_URL}${form.action}`, {
                method: form.method || 'POST',
                body: formData
            });
            
            const html = await response.text();
            return this.parseScheduleHTML(html);
        } catch (error) {
            console.error('Error submitting form:', error);
            return null;
        }
    }
    
    static parseScheduleHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const schedule = [];
        
        const tables = doc.querySelectorAll('table');
        
        tables.forEach(table => {
            const rows = table.querySelectorAll('tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 4) {
                    const lesson = {
                        time: cells[0]?.textContent.trim() || '',
                        subject: cells[1]?.textContent.trim() || '',
                        teacher: cells[2]?.textContent.trim() || '',
                        room: cells[3]?.textContent.trim() || ''
                    };
                    
                    if (lesson.time && lesson.subject) {
                        schedule.push(lesson);
                    }
                }
            });
        });
        
        return schedule;
    }
    
    static getFallbackSchedule(options) {
        return [
            { time: '09:00-10:30', subject: 'Математика', teacher: 'Иванов И.И.', room: 'ауд. 101' },
            { time: '10:45-12:15', subject: 'Физика', teacher: 'Петров П.П.', room: 'ауд. 203' },
            { time: '13:00-14:30', subject: 'Информатика', teacher: 'Сидоров С.С.', room: 'ауд. 305' }
        ];
    }
}