<?php
/**
 * Plugins custom settings page that adheres to wp standard
 * see: https://developer.wordpress.org/plugins/settings/custom-settings-page/
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * WP Settings Class.
 */
class UGP_Shortcodes
{

    /**
     * The single instance of the class.
     *
     * @since 1.0
     */
    protected static $_instance = null;

    /**
     * Main Instance.
     * 
     * @since 1.0
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * USA gasoline prices table
     *
     * @since 1.0
     * @access public
     */
    public function usa_gasoline_prices_table_shortcode() { 


        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_R5XCA_DPG&length=30",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        $data = json_decode($response)->response->data;
        $data2 = array();

        foreach ($data as $key => $item) {
            $item->period = date("m/d/y", strtotime($item->period));
            $data2[$item->{'area-name'}][] = $item;
        }

        ksort($data2, SORT_NUMERIC);

        $monday = date('Y-m-d',strtotime("last Monday"));
        $year_ago = strtotime('- 1 year', strtotime("last Monday"));
error_log(print_r(date('Y-m-d',$year_ago),true));
        
        // ob_start();
        require_once(UGP_TEMPLATES_ROOT_DIR . 'gasoline-prices-table.php');
        //assign the file output to $content variable and clean buffer
        // $content = ob_get_clean();
        // return $content;

    }

    /**
     * USA diesel prices table
     *
     * @since 1.0
     * @access public
     */
    public function usa_diesel_prices_table_shortcode() { 


        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&length=33",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        $data = json_decode($response)->response->data;
        $data2 = array();

        foreach ($data as $key => $item) {
            $item->period = date("m/d/y", strtotime($item->period));
            $data2[$item->{'area-name'}][] = $item;
        }
        
        ksort($data2, SORT_NUMERIC);

        
        // ob_start();
        require_once(UGP_TEMPLATES_ROOT_DIR . 'disel-prices-table.php');
        //assign the file output to $content variable and clean buffer
        // $content = ob_get_clean();
        // return $content;

    }

    /**
     * USA Gas prices chart
     *
     * @since 1.0
     * @access public
     */
    public function usa_gas_prices_chart_shortcode() { 
        ?><div class="wrap">
            <div id="usa-gas-prices-chart">
                <h2>Loading...</h2>
            </div>
        </div><?php
    }

    public function api_request($url) {
    }

    /**
     * Execute Model.
     *
     * @since 1.0
     * @access public
     */
    public function run() { 

        // USA gasoline prices table shortcode
        add_shortcode('usa_gasoline_prices_table', array($this, 'usa_gasoline_prices_table_shortcode'));

        // USA diesel prices table shortcode
        add_shortcode('usa_diesel_prices_table', array($this, 'usa_diesel_prices_table_shortcode'));

        // USA Gas prices chart shortcode
        add_shortcode('usa_gas_prices_chart', array($this, 'usa_gas_prices_chart_shortcode'));
    }
    
}