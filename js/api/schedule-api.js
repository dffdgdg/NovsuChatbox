// Файл: js/api/schedule-api.js

class ScheduleAPI {
    static BASE_URL = 'https://portal.novsu.ru';
    
    static async analyzeTimetableStructure() {
        try {
            
            const response = await fetch(`${this.BASE_URL}/univer/timetable/`);
            const html = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const forms = doc.querySelectorAll('form');
            const selectElements = doc.querySelectorAll('select');
            const dataContainers = doc.querySelectorAll('[data-*]');
            
            return {
                forms: forms.length,
                selects: selectElements.length,
                dataAttributes: dataContainers.length,
                structure: this.parseStructure(doc)
            };
        } catch (error) {
            console.error('Error analyzing timetable:', error);
            return null;
        }
    }
    
    static parseStructure(doc) {
        const structure = {
            faculties: [],
            groups: [],
            teachers: [],
            rooms: []
        };
        
        const facultySelect = doc.querySelector('select[name*="faculty"], select[id*="faculty"]');
        if (facultySelect) {
            structure.faculties = Array.from(facultySelect.options)
                .map(opt => ({ value: opt.value, text: opt.text }));
        }
        
        return structure;
    }
}