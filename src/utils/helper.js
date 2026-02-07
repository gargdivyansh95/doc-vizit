// Convert access duration value to human-readable text
export const getAccessDurationText = (value) => {
    if (value <= 24) {
        const hours = value === 1 ? 1 : value
        if (hours < 24) return `${hours} Hour${hours > 1 ? 's' : ''}`
        return `1 Day`
    } else if (value <= 30) {
        const days = (value - 24) + 1
        if (days < 7) return `${days} Day${days > 1 ? 's' : ''}`
        return `1 Week`
    } else if (value <= 34) {
        const weeks = (value - 30) + 1
        if (weeks < 4) return `${weeks} Week${weeks > 1 ? 's' : ''}`
        return `1 Month`
    }
}

// Calculate slider percentage based on value
export const getSliderPercent = (value, min = 1, max = 33) => {
    return ((value - min) / (max - min)) * 100;
};

// Convert access duration value to minutes
export const getAccessDurationInMinutes = (value) => {
    // 1–23 → hours
    if (value < 24) {
        return value * 60;
    }

    // 24 → 1 day
    if (value === 24) {
        return 24 * 60;
    }

    // 25–30 → days (max 7 days)
    if (value <= 30) {
        const days = (value - 24) + 1;
        return days * 24 * 60;
    }

    // 31–34 → weeks (max 4 weeks)
    const weeks = (value - 30) + 1;
    return weeks * 7 * 24 * 60;
};

// Convert access duration in minutes to human-readable text
export const getAccessDurationLabel = (minutes) => {
    if (!minutes) return '';
    const totalHours = minutes / 60;
    // 1–23 hours
    if (totalHours < 24) {
        return `${totalHours} Hour${totalHours > 1 ? 's' : ''}`;
    }

    // exactly 1 day
    if (totalHours === 24) {
        return '1 Day';
    }

    const totalDays = totalHours / 24;
    // 2–7 days
    if (totalDays < 7) {
        return `${totalDays} Day${totalDays > 1 ? 's' : ''}`;
    }

    const totalWeeks = totalDays / 7;
    // 1–4 weeks
    if (totalWeeks < 4) {
        return `${totalWeeks} Week${totalWeeks > 1 ? 's' : ''}`;
    }

    // fallback (1 month = 4 weeks)
    return '1 Month';
};


// Format time in seconds to "MM:SS"
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Generate test name string from array
export const generateTestNameString = (tests = []) => {
    const names = tests.filter(Boolean);
    const last = names.pop();
    return last ? names.length ? `${names.join(', ')} & ${last}` : last : '';
};

// Generate report type array from report data
export const generateReportType = (report = []) => {
    const reportMap = new Map();
    report.forEach(item => {
        if (item.category) {
            reportMap.set(item.category, true);
        }
    });
    return Array.from(reportMap.keys());
}

// Generate unique test tags from tests array
export const generateUniqueTestTags = (tests = []) => {
    const item = new Set();
    return tests.reduce((acc, test) => {
        const name = test?.test_name?.trim();
        if (!name) return acc;
        const key = name.toLowerCase();
        if (!item.has(key)) {
            item.add(key);
            acc.push(name);
        }
        return acc;
    }, []);
};

// Determine result status based on result and reference range
export function getResultStatus(result, bioRefRange) {
    if (!result || !bioRefRange) return "Unknown";

    // Extract numeric value from result (ignore L / H)
    const value = parseFloat(result);
    if (isNaN(value)) return "Unknown";

    // Extract min & max from range
    const rangeMatch = bioRefRange.match(/([\d.]+)\s*-\s*([\d.]+)/);
    if (!rangeMatch) return "Unknown";

    const min = parseFloat(rangeMatch[1]);
    const max = parseFloat(rangeMatch[2]);

    if (value < min) return "Low";
    if (value > max) return "High";
    return "Looks Good";
}

// Parse range string "min-max" to { min, max }
export const parseRange = (range) => {
    if (!range) return { min: 0, max: 0 };
    // const [min, max] = range.split("-").map(Number);
    // return { min, max };
    const numbers = range.match(/[\d.]+/g);
    if (!numbers || numbers.length < 2) {
        return { min: 0, max: 0 };
    }
    return {
        min: Number(numbers[0]),
        max: Number(numbers[1]),
    };
};

// Parse result string to numeric value
export const parseResult = (result) => {
    if (!result) return 0;
    return Number(result.replace(/[^\d.]/g, ""));
};

// Convert height string to cm
export const convertHeightToCm = (heightString) => {
    // "6.4" → 6 feet 4 inches
    const parts = heightString?.split('.');
    const feet = parseInt(parts?.[0]) || 0;
    const inches = parseInt(parts?.[1]) || 0;

    // 1 foot = 30.48 cm, 1 inch = 2.54 cm
    const totalCm = (feet * 30.48) + (inches * 2.54);
    return Math.round(totalCm); // Round to nearest integer
};

// Check if profile is completed
export const isProfileCompleted = (profile) => {
    return Boolean(
        profile?.dob &&
        profile?.gender &&
        profile?.blood_group &&
        profile?.height &&
        profile?.weight
    );
};